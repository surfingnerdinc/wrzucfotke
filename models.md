# Modele Bazy Danych - WrzućFotkę.pl

## 1. User (Użytkownicy)
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    customer_type ENUM('personal', 'company') DEFAULT 'personal',
    nip VARCHAR(20) NULL, -- dla firm
    
    -- Daty
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    email_verified_at TIMESTAMP NULL,
    
    -- Status konta
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    
    -- Plan i subskrypcja
    current_plan_id VARCHAR(36) NULL,
    plan_valid_from DATE NULL,
    plan_valid_to DATE NULL,
    
    -- Limity i statystyki
    storage_used DECIMAL(10,2) DEFAULT 0, -- w GB
    storage_limit DECIMAL(10,2) DEFAULT 5, -- w GB
    galleries_count INT DEFAULT 0,
    total_photos INT DEFAULT 0,
    total_paid DECIMAL(10,2) DEFAULT 0,
    
    -- Dane rozliczeniowe
    billing_first_name VARCHAR(100),
    billing_last_name VARCHAR(100),
    billing_address VARCHAR(255),
    billing_postal_code VARCHAR(10),
    billing_city VARCHAR(100),
    billing_country VARCHAR(2) DEFAULT 'PL',
    
    FOREIGN KEY (current_plan_id) REFERENCES plans(id)
);
```

## 2. Plans (Plany subskrypcji)
```sql
CREATE TABLE plans (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PLN',
    
    -- Typ planu
    plan_type ENUM('monthly', 'yearly', 'one-time') NOT NULL,
    duration_months INT, -- NULL dla one-time
    
    -- Limity planu
    max_galleries INT,
    max_storage_gb DECIMAL(10,2),
    max_photos_per_gallery INT,
    
    -- Funkcje
    features JSON, -- ['ai_design', 'custom_branding', 'analytics', 'priority_support']
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 3. Orders (Zamówienia)
```sql
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    order_number VARCHAR(20) UNIQUE NOT NULL, -- WF-2025-001234
    user_id VARCHAR(36) NOT NULL,
    plan_id VARCHAR(36) NOT NULL,
    
    -- Kwoty
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PLN',
    tax_rate DECIMAL(5,2) DEFAULT 23.00, -- VAT
    tax_amount DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Status zamówienia
    status ENUM('pending', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50), -- 'card', 'paypal', 'transfer'
    payment_intent_id VARCHAR(255), -- Stripe/PayPal ID
    
    -- Daty
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP NULL,
    valid_from DATE NULL,
    valid_to DATE NULL,
    
    -- Faktura
    invoice_number VARCHAR(20) NULL,
    invoice_path VARCHAR(255) NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);
```

## 4. Galleries (Galerie)
```sql
CREATE TABLE galleries (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    
    -- Podstawowe info
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- anna-tomek-2025
    description TEXT,
    
    -- Event info
    event_date DATE NULL,
    event_type ENUM('wedding', 'birthday', 'corporate', 'graduation', 'other') DEFAULT 'other',
    
    -- Ustawienia dostępu
    is_public BOOLEAN DEFAULT TRUE,
    password_hash VARCHAR(255) NULL, -- opcjonalne hasło
    allow_uploads BOOLEAN DEFAULT TRUE,
    allow_downloads BOOLEAN DEFAULT TRUE,
    
    -- Ustawienia moderacji
    moderate_uploads BOOLEAN DEFAULT FALSE,
    require_guest_name BOOLEAN DEFAULT TRUE,
    require_guest_email BOOLEAN DEFAULT FALSE,
    max_photos_per_guest INT NULL,
    
    -- Media
    cover_image_path VARCHAR(255) NULL,
    
    -- Statystyki
    total_photos INT DEFAULT 0,
    total_views INT DEFAULT 0,
    total_downloads INT DEFAULT 0,
    storage_used DECIMAL(10,2) DEFAULT 0, -- w MB
    
    -- QR kod
    qr_code_path VARCHAR(255) NULL,
    
    -- Daty
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL, -- gdy wygasa plan użytkownika
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_slug (slug),
    INDEX idx_user_galleries (user_id, created_at)
);
```

## 5. Photos (Zdjęcia)
```sql
CREATE TABLE photos (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    gallery_id VARCHAR(36) NOT NULL,
    uploader_session_id VARCHAR(255), -- dla gości
    
    -- Pliki
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    thumbnail_path VARCHAR(500),
    
    -- Metadata
    file_size INT NOT NULL, -- w bajtach
    mime_type VARCHAR(100),
    width INT,
    height INT,
    
    -- EXIF data (opcjonalne)
    camera_make VARCHAR(100),
    camera_model VARCHAR(100),
    taken_at TIMESTAMP NULL,
    
    -- Gość info
    uploaded_by_name VARCHAR(100),
    uploaded_by_email VARCHAR(100),
    uploaded_by_phone VARCHAR(20),
    
    -- Status
    status ENUM('uploaded', 'processing', 'approved', 'rejected') DEFAULT 'uploaded',
    is_approved BOOLEAN DEFAULT TRUE,
    rejection_reason TEXT,
    
    -- Statystyki
    views_count INT DEFAULT 0,
    downloads_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    
    -- Daty
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE,
    INDEX idx_gallery_photos (gallery_id, uploaded_at),
    INDEX idx_status (status)
);
```

## 6. Guest_Sessions (Sesje gości)
```sql
CREATE TABLE guest_sessions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    gallery_id VARCHAR(36) NOT NULL,
    
    -- Info gościa
    guest_name VARCHAR(100),
    guest_email VARCHAR(100),
    guest_phone VARCHAR(20),
    
    -- Statystyki sesji
    photos_uploaded INT DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address VARCHAR(45),
    
    -- Daty
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 30 DAY),
    
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_gallery_sessions (gallery_id, created_at)
);
```

## 7. Photo_Interactions (Interakcje ze zdjęciami)
```sql
CREATE TABLE photo_interactions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    photo_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(255), -- guest session lub user session
    user_id VARCHAR(36) NULL, -- jeśli zalogowany użytkownik
    
    -- Typ interakcji
    interaction_type ENUM('view', 'download', 'like', 'unlike', 'share') NOT NULL,
    
    -- Metadata
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Daty
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_photo_interactions (photo_id, interaction_type),
    INDEX idx_session_interactions (session_id, created_at)
);
```

## 8. Gallery_Analytics (Analityki galerii)
```sql
CREATE TABLE gallery_analytics (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    gallery_id VARCHAR(36) NOT NULL,
    
    -- Dane analityczne
    date DATE NOT NULL,
    unique_visitors INT DEFAULT 0,
    page_views INT DEFAULT 0,
    photos_uploaded INT DEFAULT 0,
    photos_downloaded INT DEFAULT 0,
    
    -- Źródła ruchu
    direct_visits INT DEFAULT 0,
    social_visits INT DEFAULT 0,
    referral_visits INT DEFAULT 0,
    
    -- Urządzenia
    mobile_visits INT DEFAULT 0,
    desktop_visits INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE,
    UNIQUE KEY unique_gallery_date (gallery_id, date),
    INDEX idx_analytics_date (date)
);
```

## 9. Activity_Log (Logi aktywności)
```sql
CREATE TABLE activity_log (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NULL,
    gallery_id VARCHAR(36) NULL,
    
    -- Typ aktywności
    activity_type ENUM(
        'user_registered',
        'user_login',
        'gallery_created',
        'gallery_updated',
        'photo_uploaded',
        'photo_downloaded',
        'payment_completed',
        'plan_changed'
    ) NOT NULL,
    
    -- Opis aktywności
    description TEXT,
    metadata JSON, -- dodatkowe dane
    
    -- Kontekst
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE SET NULL,
    INDEX idx_activity_type (activity_type, created_at),
    INDEX idx_user_activity (user_id, created_at)
);
```

## 10. Email_Templates (Szablony emaili)
```sql
CREATE TABLE email_templates (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    html_content LONGTEXT NOT NULL,
    text_content LONGTEXT,
    
    -- Zmienne dostępne w szablonie
    variables JSON, -- ['user_name', 'gallery_name', 'order_number']
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 11. Notifications (Powiadomienia)
```sql
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    
    -- Treść
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    is_sent_email BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    action_url VARCHAR(500) NULL,
    metadata JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_notifications (user_id, is_read, created_at)
);
```

## 12. Settings (Ustawienia systemowe)
```sql
CREATE TABLE settings (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value LONGTEXT,
    data_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    
    -- Kategoryzacja
    category VARCHAR(50) DEFAULT 'general',
    is_public BOOLEAN DEFAULT FALSE, -- czy dostępne przez API
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Relacje między tabelami

### Główne powiązania:
- **User** → **Orders** (1:N) - użytkownik może mieć wiele zamówień
- **User** → **Galleries** (1:N) - użytkownik może mieć wiele galerii  
- **Gallery** → **Photos** (1:N) - galeria może mieć wiele zdjęć
- **Gallery** → **Guest_Sessions** (1:N) - galeria może mieć wiele sesji gości
- **Photo** → **Photo_Interactions** (1:N) - zdjęcie może mieć wiele interakcji

### Indeksy potrzebne do wydajności:
- `users(email)` - logowanie
- `galleries(slug)` - dostęp publiczny do galerii
- `galleries(user_id, created_at)` - galerie użytkownika
- `photos(gallery_id, uploaded_at)` - zdjęcia w galerii
- `guest_sessions(session_token)` - identyfikacja gości
- `activity_log(user_id, created_at)` - aktywność użytkownika

## Przykładowe dane seed:

### Plans:
```sql
INSERT INTO plans (id, name, price, plan_type, duration_months, max_galleries, max_storage_gb, features) VALUES
('plan-wedding-monthly', 'Wedding - Miesięczny', 250.00, 'monthly', 1, 5, 50, '["unlimited_photos", "qr_codes", "custom_branding"]'),
('plan-wedding-yearly', 'Wedding - Roczny', 600.00, 'yearly', 12, 10, 100, '["unlimited_photos", "qr_codes", "custom_branding", "priority_support"]'),
('plan-pro', 'Pro', 450.00, 'yearly', 12, 20, 200, '["unlimited_photos", "ai_design", "analytics", "api_access"]');
```

### Email Templates:
```sql
INSERT INTO email_templates (name, subject, html_content, variables) VALUES
('welcome', 'Witamy w WrzućFotkę.pl!', '<h1>Cześć {{user_name}}!</h1><p>Dziękujemy za rejestrację...</p>', '["user_name"]'),
('payment_success', 'Płatność została zrealizowana', '<h1>Dziękujemy za płatność!</h1><p>Zamówienie {{order_number}} zostało opłacone.</p>', '["user_name", "order_number", "plan_name"]'),
('gallery_created', 'Twoja galeria została utworzona', '<h1>Galeria gotowa!</h1><p>Link: {{gallery_url}}</p>', '["user_name", "gallery_name", "gallery_url"]');
```

To są wszystkie potrzebne modele do implementacji pełnej funkcjonalności aplikacji WrzućFotkę.pl!