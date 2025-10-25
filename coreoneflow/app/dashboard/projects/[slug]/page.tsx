'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  manager: {
    name: string;
    avatar: string;
    id: string;
    email: string;
  };
  client: {
    name: string;
    company: string;
    id: string;
    avatar: string;
    email: string;
    phone: string;
  };
  team: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
    workload: number;
    skills: string[];
    status: 'online' | 'away' | 'offline';
    lastSeen?: string;
  }>;
  startDate: string;
  endDate: string;
  budget: {
    allocated: number;
    spent: number;
    remaining: number;
    currency: string;
    breakdown: Array<{
      category: string;
      allocated: number;
      spent: number;
    }>;
  };
  progress: number;
  healthScore: number;
  milestones: Array<{
    id: string;
    name: string;
    description: string;
    date: string;
    status: 'pending' | 'completed' | 'overdue' | 'at-risk';
    progress: number;
    assignee: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignee: string;
    startDate: string;
    endDate: string;
    duration: number; // days
    progress: number;
    dependencies: string[];
  }>;
  files: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    uploadedBy: string;
    uploadDate: string;
    category: 'document' | 'design' | 'code' | 'contract' | 'invoice' | 'presentation' | 'other';
    tags: string[];
    assignedTo?: Array<{
      type: 'client' | 'project' | 'task';
      id: string;
      name: string;
    }>;
    version: number;
    isLatestVersion: boolean;
    parentFileId?: string;
    permissions: {
      canView: string[];
      canEdit: string[];
      canDelete: string[];
    };
    metadata?: {
      pages?: number;
      resolution?: string;
      duration?: string;
    };
  }>;
  activities: Array<{
    id: string;
    type: 'comment' | 'file_upload' | 'task_update' | 'milestone' | 'team_change';
    user: string;
    avatar: string;
    content: string;
    timestamp: string;
    metadata?: any;
  }>;
  aiInsights: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    completionPrediction: string;
    budgetForecast: number;
    recommendations: string[];
    blockers: string[];
    opportunities: string[];
  };
  settings: {
    notifications: boolean;
    publicAccess: boolean;
    allowComments: boolean;
    autoSave: boolean;
  };
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.slug as string;
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'gantt' | 'resources' | 'collaboration' | 'files' | 'analytics'>('overview');
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newComment, setNewComment] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    user: string;
    avatar: string;
    content: string;
    timestamp: string;
    type: 'message' | 'system';
  }>>([]);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'mention' | 'task' | 'deadline' | 'milestone' | 'file';
    title: string;
    content: string;
    timestamp: string;
    read: boolean;
    user?: string;
    avatar?: string;
  }>>([]);
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [ganttScale, setGanttScale] = useState<'days' | 'weeks' | 'months'>('weeks');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [ganttStartDate, setGanttStartDate] = useState(new Date('2024-09-01'));
  const [ganttEndDate, setGanttEndDate] = useState(new Date('2024-12-31'));
  const [fileViewMode, setFileViewMode] = useState<'grid' | 'list' | 'timeline'>('grid');
  const [fileFilter, setFileFilter] = useState<'all' | 'document' | 'design' | 'code' | 'contract' | 'invoice' | 'presentation'>('all');
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showFileDetails, setShowFileDetails] = useState<string | null>(null);
  const [draggedFile, setDraggedFile] = useState<string | null>(null);

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: 'Professional'
  };

  // Mock project data
  const projectData: ProjectDetail = {
    id: projectId,
    name: 'Core CRM System',
    description: 'Kompleksowy system CRM z integracją AI i zaawansowaną analityką dla klientów enterprise. Projekt obejmuje backend API, frontend aplikację, mobile app oraz zaawansowane narzędzia analityczne z machine learning.',
    status: 'active',
    priority: 'critical',
    manager: {
      name: 'Marcin Dubiński',
      avatar: '👨‍💼',
      id: 'user-1',
      email: 'marcin@coreoneflow.com'
    },
    client: {
      name: 'Anna Kowalska',
      company: 'TechCorp Solutions',
      id: 'tech-corp',
      avatar: '👩‍💼',
      email: 'anna@techcorp.com',
      phone: '+48 123 456 789'
    },
    team: [
      {
        id: 'u1',
        name: 'Marcin Dubiński',
        avatar: '👨‍💼',
        role: 'Project Manager',
        workload: 85,
        skills: ['Project Management', 'Strategy', 'Leadership'],
        status: 'online'
      },
      {
        id: 'u2',
        name: 'Piotr Kowal',
        avatar: '👨‍💻',
        role: 'Lead Developer',
        workload: 95,
        skills: ['JavaScript', 'React', 'Node.js', 'AI/ML'],
        status: 'online'
      },
      {
        id: 'u3',
        name: 'Anna Wiśniewska',
        avatar: '👩‍🎨',
        role: 'UI/UX Designer',
        workload: 70,
        skills: ['Design', 'Figma', 'User Research'],
        status: 'away',
        lastSeen: '2024-10-24T14:30:00'
      },
      {
        id: 'u4',
        name: 'Tomasz Nowicki',
        avatar: '🧑‍💻',
        role: 'Backend Developer',
        workload: 80,
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        status: 'online'
      },
      {
        id: 'u5',
        name: 'Kasia Lewandowska',
        avatar: '👩‍💻',
        role: 'Frontend Developer',
        workload: 75,
        skills: ['React', 'TypeScript', 'CSS', 'Testing'],
        status: 'offline',
        lastSeen: '2024-10-24T16:45:00'
      }
    ],
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    budget: {
      allocated: 250000,
      spent: 185000,
      remaining: 65000,
      currency: 'PLN',
      breakdown: [
        { category: 'Development', allocated: 150000, spent: 115000 },
        { category: 'Design', allocated: 40000, spent: 32000 },
        { category: 'Testing', allocated: 30000, spent: 20000 },
        { category: 'Infrastructure', allocated: 20000, spent: 12000 },
        { category: 'Other', allocated: 10000, spent: 6000 }
      ]
    },
    progress: 72,
    healthScore: 85,
    milestones: [
      {
        id: 'm1',
        name: 'Project Kickoff',
        description: 'Initial project setup and team onboarding',
        date: '2024-09-01',
        status: 'completed',
        progress: 100,
        assignee: 'Marcin Dubiński'
      },
      {
        id: 'm2',
        name: 'MVP Development',
        description: 'Core functionality implementation',
        date: '2024-10-30',
        status: 'completed',
        progress: 100,
        assignee: 'Piotr Kowal'
      },
      {
        id: 'm3',
        name: 'Beta Testing Phase',
        description: 'User testing and feedback collection',
        date: '2024-11-15',
        status: 'pending',
        progress: 25,
        assignee: 'Anna Wiśniewska'
      },
      {
        id: 'm4',
        name: 'Production Launch',
        description: 'Final deployment and go-live',
        date: '2024-12-15',
        status: 'pending',
        progress: 0,
        assignee: 'Tomasz Nowicki'
      }
    ],
    tasks: [
      {
        id: 't1',
        title: 'API Authentication System',
        status: 'completed',
        priority: 'high',
        assignee: 'Piotr Kowal',
        startDate: '2024-09-01',
        endDate: '2024-09-15',
        duration: 14,
        progress: 100,
        dependencies: []
      },
      {
        id: 't2',
        title: 'Database Schema Design',
        status: 'completed',
        priority: 'high',
        assignee: 'Tomasz Nowicki',
        startDate: '2024-09-10',
        endDate: '2024-09-20',
        duration: 10,
        progress: 100,
        dependencies: ['t1']
      },
      {
        id: 't3',
        title: 'UI Component Library',
        status: 'in-progress',
        priority: 'medium',
        assignee: 'Anna Wiśniewska',
        startDate: '2024-10-01',
        endDate: '2024-10-25',
        duration: 24,
        progress: 80,
        dependencies: []
      },
      {
        id: 't4',
        title: 'AI Integration Module',
        status: 'in-progress',
        priority: 'urgent',
        assignee: 'Piotr Kowal',
        startDate: '2024-10-15',
        endDate: '2024-11-10',
        duration: 26,
        progress: 45,
        dependencies: ['t1', 't2']
      },
      {
        id: 't5',
        title: 'Mobile App Development',
        status: 'todo',
        priority: 'medium',
        assignee: 'Kasia Lewandowska',
        startDate: '2024-11-01',
        endDate: '2024-12-01',
        duration: 30,
        progress: 0,
        dependencies: ['t3']
      }
    ],
    files: [
      {
        id: 'f1',
        name: 'Project_Requirements.pdf',
        size: '2.4 MB',
        type: 'application/pdf',
        uploadedBy: 'Marcin Dubiński',
        uploadDate: '2024-09-01',
        category: 'document',
        tags: ['requirements', 'specification', 'critical'],
        version: 1,
        isLatestVersion: true,
        assignedTo: [
          { type: 'project', id: 'proj-1', name: 'Core CRM System' },
          { type: 'client', id: 'tech-corp', name: 'TechCorp Solutions' }
        ],
        permissions: {
          canView: ['all'],
          canEdit: ['Marcin Dubiński', 'Piotr Kowal'],
          canDelete: ['Marcin Dubiński']
        },
        metadata: { pages: 24 }
      },
      {
        id: 'f2',
        name: 'UI_Mockups.figma',
        size: '15.8 MB',
        type: 'application/figma',
        uploadedBy: 'Anna Wiśniewska',
        uploadDate: '2024-09-15',
        category: 'design',
        tags: ['UI', 'mockups', 'design system'],
        version: 3,
        isLatestVersion: true,
        assignedTo: [
          { type: 'project', id: 'proj-1', name: 'Core CRM System' }
        ],
        permissions: {
          canView: ['all'],
          canEdit: ['Anna Wiśniewska', 'Marcin Dubiński'],
          canDelete: ['Anna Wiśniewska']
        }
      },
      {
        id: 'f3',
        name: 'API_Documentation.md',
        size: '156 KB',
        type: 'text/markdown',
        uploadedBy: 'Piotr Kowal',
        uploadDate: '2024-10-05',
        category: 'document',
        tags: ['API', 'documentation', 'technical'],
        version: 2,
        isLatestVersion: true,
        assignedTo: [
          { type: 'project', id: 'proj-1', name: 'Core CRM System' }
        ],
        permissions: {
          canView: ['all'],
          canEdit: ['Piotr Kowal', 'Tomasz Nowicki'],
          canDelete: ['Piotr Kowal']
        }
      },
      {
        id: 'f4',
        name: 'Contract_TechCorp_2024.pdf',
        size: '890 KB',
        type: 'application/pdf',
        uploadedBy: 'Marcin Dubiński',
        uploadDate: '2024-08-15',
        category: 'contract',
        tags: ['contract', 'legal', 'TechCorp', '2024'],
        version: 1,
        isLatestVersion: true,
        assignedTo: [
          { type: 'client', id: 'tech-corp', name: 'TechCorp Solutions' },
          { type: 'project', id: 'proj-1', name: 'Core CRM System' }
        ],
        permissions: {
          canView: ['Marcin Dubiński', 'Anna Kowalska'],
          canEdit: ['Marcin Dubiński'],
          canDelete: ['Marcin Dubiński']
        },
        metadata: { pages: 12 }
      },
      {
        id: 'f5',
        name: 'Invoice_TechCorp_001.pdf',
        size: '245 KB',
        type: 'application/pdf',
        uploadedBy: 'Marcin Dubiński',
        uploadDate: '2024-10-01',
        category: 'invoice',
        tags: ['invoice', 'payment', 'TechCorp'],
        version: 1,
        isLatestVersion: true,
        assignedTo: [
          { type: 'client', id: 'tech-corp', name: 'TechCorp Solutions' }
        ],
        permissions: {
          canView: ['Marcin Dubiński', 'Anna Kowalska'],
          canEdit: ['Marcin Dubiński'],
          canDelete: ['Marcin Dubiński']
        },
        metadata: { pages: 3 }
      },
      {
        id: 'f6',
        name: 'Project_Presentation.pptx',
        size: '12.4 MB',
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        uploadedBy: 'Anna Wiśniewska',
        uploadDate: '2024-10-20',
        category: 'presentation',
        tags: ['presentation', 'demo', 'client meeting'],
        version: 1,
        isLatestVersion: true,
        assignedTo: [
          { type: 'client', id: 'tech-corp', name: 'TechCorp Solutions' },
          { type: 'project', id: 'proj-1', name: 'Core CRM System' }
        ],
        permissions: {
          canView: ['all'],
          canEdit: ['Anna Wiśniewska', 'Marcin Dubiński'],
          canDelete: ['Anna Wiśniewska']
        },
        metadata: { pages: 18 }
      }
    ],
    activities: [
      {
        id: 'a1',
        type: 'task_update',
        user: 'Piotr Kowal',
        avatar: '👨‍💻',
        content: 'Ukończył zadanie "AI Integration Module" - podstawowa funkcjonalność gotowa',
        timestamp: '2024-10-24T10:30:00',
        metadata: { taskId: 't4', progress: 45 }
      },
      {
        id: 'a2',
        type: 'comment',
        user: 'Anna Kowalska',
        avatar: '👩‍💼',
        content: 'Świetny postęp w tym tygodniu! Czy możemy zaplanować demo dla zespołu w przyszłym tygodniu?',
        timestamp: '2024-10-24T09:15:00'
      },
      {
        id: 'a3',
        type: 'file_upload',
        user: 'Anna Wiśniewska',
        avatar: '👩‍🎨',
        content: 'Dodała nowe mockupy dla modułu raportowania',
        timestamp: '2024-10-24T08:45:00',
        metadata: { fileName: 'Reports_UI_v2.figma' }
      }
    ],
    aiInsights: {
      riskLevel: 'medium',
      completionPrediction: '2024-12-18',
      budgetForecast: 245000,
      recommendations: [
        'Rozważ przyspieszenie prac nad AI Integration Module',
        'Zaplanuj dodatkowe sesje testowe z klientem',
        'Dodaj buffer czasowy dla fazy testowania'
      ],
      blockers: [
        'Oczekiwanie na finalne dane testowe od klienta',
        'Potrzeba dodatkowych zasobów dla mobile development'
      ],
      opportunities: [
        'Możliwość wcześniejszego dostarczenia core features',
        'Potencjał rozszerzenia zakresu o dodatkowe moduły'
      ]
    },
    settings: {
      notifications: true,
      publicAccess: false,
      allowComments: true,
      autoSave: true
    }
  };

  const [projectState, setProjectState] = useState(projectData);

  // Initialize messages and notifications
  useEffect(() => {
    // Initial messages
    setMessages([
      {
        id: 'msg-1',
        user: 'Anna Kowalska',
        avatar: '👩‍💼',
        content: 'Świetny postęp w tym tygodniu! Czy możemy zaplanować demo dla zespołu w przyszłym tygodniu?',
        timestamp: '2024-10-24T09:15:00',
        type: 'message'
      },
      {
        id: 'msg-2',
        user: 'System',
        avatar: '🤖',
        content: 'Piotr Kowal ukończył zadanie "AI Integration Module"',
        timestamp: '2024-10-24T10:30:00',
        type: 'system'
      },
      {
        id: 'msg-3',
        user: 'Piotr Kowal',
        avatar: '👨‍💻',
        content: '@marcin możemy przejrzeć kod AI modułu? Chciałbym Twoją opinię na temat architektury',
        timestamp: '2024-10-24T11:45:00',
        type: 'message'
      },
      {
        id: 'msg-4',
        user: 'Anna Wiśniewska',
        avatar: '👩‍🎨',
        content: 'Właśnie uploadowałam nowe mockupy dla dashboard. Co myślicie o kolorystyce?',
        timestamp: '2024-10-24T14:20:00',
        type: 'message'
      },
      {
        id: 'msg-5',
        user: 'Marcin Dubiński',
        avatar: '👨‍💼',
        content: 'Excellent work team! 🎉 Jesteśmy on track z milestone\'ami',
        timestamp: '2024-10-24T15:30:00',
        type: 'message'
      }
    ]);

    // Initial notifications
    setNotifications([
      {
        id: 'notif-1',
        type: 'mention',
        title: 'Zostałeś oznaczony',
        content: 'Piotr Kowal oznaczył Cię w komentarzu do zadania "AI Integration"',
        timestamp: '2024-10-24T11:45:00',
        read: false,
        user: 'Piotr Kowal',
        avatar: '👨‍💻'
      },
      {
        id: 'notif-2',
        type: 'deadline',
        title: 'Zbliżający się termin',
        content: 'Zadanie "UI Component Library" ma termin za 2 dni',
        timestamp: '2024-10-24T08:00:00',
        read: false
      },
      {
        id: 'notif-3',
        type: 'milestone',
        title: 'Kamień milowy ukończony',
        content: 'MVP Development został ukończony przed terminem!',
        timestamp: '2024-10-23T16:30:00',
        read: true
      },
      {
        id: 'notif-4',
        type: 'file',
        title: 'Nowy plik dodany',
        content: 'Anna Wiśniewska dodała "Reports_UI_v2.figma"',
        timestamp: '2024-10-24T08:45:00',
        read: true,
        user: 'Anna Wiśniewska',
        avatar: '👩‍🎨'
      },
      {
        id: 'notif-5',
        type: 'task',
        title: 'Zadanie zaktualizowane',
        content: 'Status zadania "Mobile App Development" zmieniony na "In Progress"',
        timestamp: '2024-10-24T12:15:00',
        read: false
      }
    ]);
  }, []);

  // Simulate real-time collaboration
  useEffect(() => {
    const activeUsers = projectState.team
      .filter(member => member.status === 'online')
      .map(member => member.id);
    setOnlineUsers(activeUsers);

    // Simulate user activity updates
    const interval = setInterval(() => {
      // Simulate random user status changes
      if (Math.random() > 0.8) {
        setProjectState(prev => ({
          ...prev,
          team: prev.team.map(member => ({
            ...member,
            status: Math.random() > 0.7 ? 'online' : member.status
          }))
        }));
      }

      // Simulate typing indicators
      if (Math.random() > 0.85) {
        const onlineTeam = projectState.team.filter(m => m.status === 'online' && m.id !== 'u1');
        if (onlineTeam.length > 0) {
          const randomMember = onlineTeam[Math.floor(Math.random() * onlineTeam.length)];
          setIsTyping(prev => [...prev.filter(id => id !== randomMember.name), randomMember.name]);
          
          // Remove typing after 3 seconds
          setTimeout(() => {
            setIsTyping(prev => prev.filter(id => id !== randomMember.name));
          }, 3000);
        }
      }

      // Simulate new messages occasionally
      if (Math.random() > 0.95) {
        const onlineTeam = projectState.team.filter(m => m.status === 'online' && m.id !== 'u1');
        if (onlineTeam.length > 0) {
          const randomMember = onlineTeam[Math.floor(Math.random() * onlineTeam.length)];
          const randomMessages = [
            'Status update: wszystko idzie zgodnie z planem 👍',
            'Potrzebuję feedback na temat nowych zmian',
            'Ktoś może pomóc z debugowaniem?',
            'Świetna robota zespół! 🎉',
            'Mam pytanie odnośnie requirements...'
          ];
          
          const newMessage = {
            id: `msg-${Date.now()}`,
            user: randomMember.name,
            avatar: randomMember.avatar,
            content: randomMessages[Math.floor(Math.random() * randomMessages.length)],
            timestamp: new Date().toISOString(),
            type: 'message' as const
          };
          
          setMessages(prev => [...prev.slice(-20), newMessage]); // Keep last 20 messages
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [projectState.team]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'on-hold': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getDaysRemaining = (endDate: string) => {
    const days = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getFileIcon = (type: string, category?: string) => {
    if (category === 'contract') return '📋';
    if (category === 'invoice') return '🧾';
    if (category === 'presentation') return '📊';
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('figma')) return '🎨';
    if (type.includes('markdown')) return '📝';
    if (type.includes('code')) return '💻';
    if (type.includes('excel') || type.includes('sheet')) return '�';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📊';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    if (type.includes('zip') || type.includes('archive')) return '📦';
    return '�📎';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'document': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'design': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'code': return 'bg-green-100 text-green-700 border-green-300';
      case 'contract': return 'bg-red-100 text-red-700 border-red-300';
      case 'invoice': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'presentation': return 'bg-cyan-100 text-cyan-700 border-cyan-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const filteredFiles = projectState.files.filter(file => {
    if (fileFilter !== 'all' && file.category !== fileFilter) return false;
    if (fileSearchQuery && !file.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) && 
        !file.tags.some(tag => tag.toLowerCase().includes(fileSearchQuery.toLowerCase()))) return false;
    return true;
  });

  const getFileSize = (bytes: string) => {
    if (bytes.includes('MB')) return parseFloat(bytes) * 1024 * 1024;
    if (bytes.includes('KB')) return parseFloat(bytes) * 1024;
    return parseFloat(bytes);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment': return '💬';
      case 'file_upload': return '📎';
      case 'task_update': return '✅';
      case 'milestone': return '🎯';
      case 'team_change': return '👥';
      default: return '🔔';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pl-PL');
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'teraz';
    if (diffInMinutes < 60) return `${diffInMinutes}m temu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h temu`;
    return `${Math.floor(diffInMinutes / 1440)}d temu`;
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: `msg-${Date.now()}`,
        user: user.name,
        avatar: user.avatar,
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'message' as const
      };
      
      setMessages(prev => [...prev.slice(-20), message]);
      setNewMessage('');

      // Simulate system response for @mentions
      if (newMessage.includes('@')) {
        setTimeout(() => {
          const systemMessage = {
            id: `msg-${Date.now()}-system`,
            user: 'System',
            avatar: '🤖',
            content: 'Powiadomienie wysłane do oznaczonych użytkowników',
            timestamp: new Date().toISOString(),
            type: 'system' as const
          };
          setMessages(prev => [...prev.slice(-20), systemMessage]);
        }, 1000);
      }
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: `activity-${Date.now()}`,
        type: 'comment' as const,
        user: user.name,
        avatar: user.avatar,
        content: newComment,
        timestamp: new Date().toISOString()
      };
      
      setProjectState(prev => ({
        ...prev,
        activities: [comment, ...prev.activities.slice(0, 19)] // Keep last 20 activities
      }));
      
      setNewComment('');
    }
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notifId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'mention': return '👋';
      case 'task': return '✅';
      case 'deadline': return '⏰';
      case 'milestone': return '🎯';
      case 'file': return '📎';
      default: return '🔔';
    }
  };

  // Gantt Chart helper functions
  const getDaysBetween = (start: Date, end: Date) => {
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getTaskPosition = (taskStartDate: string, taskDuration: number) => {
    const start = new Date(taskStartDate);
    const projectStart = ganttStartDate;
    const dayFromStart = getDaysBetween(projectStart, start);
    const pixelsPerDay = ganttScale === 'days' ? 40 : ganttScale === 'weeks' ? 8 : 2;
    
    return {
      left: Math.max(0, dayFromStart * pixelsPerDay),
      width: taskDuration * pixelsPerDay
    };
  };

  const getTimelineHeaders = () => {
    const headers = [];
    const current = new Date(ganttStartDate);
    const end = ganttEndDate;
    
    while (current <= end) {
      if (ganttScale === 'days') {
        headers.push({
          date: new Date(current),
          label: current.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })
        });
        current.setDate(current.getDate() + 1);
      } else if (ganttScale === 'weeks') {
        headers.push({
          date: new Date(current),
          label: `W${Math.ceil(current.getDate() / 7)} ${current.toLocaleDateString('pl-PL', { month: 'short' })}`
        });
        current.setDate(current.getDate() + 7);
      } else {
        headers.push({
          date: new Date(current),
          label: current.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })
        });
        current.setMonth(current.getMonth() + 1);
      }
    }
    return headers;
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'blocked': return 'bg-red-500';
      case 'review': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const updateTaskDates = (taskId: string, newStartDate: string, newDuration: number) => {
    setProjectState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              startDate: newStartDate,
              duration: newDuration,
              endDate: new Date(new Date(newStartDate).getTime() + newDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }
          : task
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeTab}
        onSectionChange={setActiveTab}
        user={user}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          user={user}
          onSearch={(query) => console.log('Search:', query)}
        />

        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
            <span>›</span>
            <Link href="/dashboard/projects" className="hover:text-gray-700">Projekty</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{projectState.name}</span>
          </nav>

          {/* Project Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900">{projectState.name}</h1>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(projectState.status)}`}>
                    {projectState.status.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(projectState.priority)}`}>
                    {projectState.priority.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 max-w-4xl">{projectState.description}</p>
                
                {/* Client & Manager Info */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">🏢</span>
                    <Link href={`/dashboard/customers/${projectState.client.id}`} className="text-purple-600 hover:text-purple-700">
                      {projectState.client.company}
                    </Link>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{projectState.client.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">👤</span>
                    <span className="text-gray-600">PM: {projectState.manager.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">❤️</span>
                    <span className={`font-semibold ${getHealthColor(projectState.healthScore)}`}>
                      Health: {projectState.healthScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Team Status & Notifications */}
              <div className="bg-gray-50 rounded-lg p-4 min-w-64">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Zespół online</h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">{onlineUsers.length} ONLINE</span>
                    </div>
                    <button
                      onClick={() => setActiveDetailTab('collaboration')}
                      className="relative text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <span className="text-lg">💬</span>
                      {messages.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex -space-x-2 mb-3">
                  {projectState.team.filter(member => member.status === 'online').slice(0, 5).map((member) => (
                    <div
                      key={member.id}
                      className="relative w-8 h-8 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-sm border-2 border-white"
                      title={`${member.name} - ${member.role}`}
                    >
                      {member.avatar}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  ))}
                  {onlineUsers.length > 5 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs border-2 border-white text-gray-600">
                      +{onlineUsers.length - 5}
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
                  {projectState.team.length} członków zespołu
                </div>
              </div>
            </div>

            {/* Progress & Stats */}
            <div className="grid grid-cols-6 gap-6 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">📅</span>
                  <span className="text-lg font-bold text-gray-900">{getDaysRemaining(projectState.endDate)}</span>
                </div>
                <p className="text-sm text-gray-500">Dni do końca</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">✅</span>
                  <span className="text-lg font-bold text-gray-900">
                    {projectState.tasks.filter(t => t.status === 'completed').length}/{projectState.tasks.length}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Zadania</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">🎯</span>
                  <span className="text-lg font-bold text-gray-900">
                    {projectState.milestones.filter(m => m.status === 'completed').length}/{projectState.milestones.length}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Kamienie milowe</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">💰</span>
                  <span className="text-lg font-bold text-gray-900">
                    {Math.round((projectState.budget.spent / projectState.budget.allocated) * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">Budżet</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">📁</span>
                  <span className="text-lg font-bold text-gray-900">{projectState.files.length}</span>
                </div>
                <p className="text-sm text-gray-500">Pliki</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">🤖</span>
                  <span className={`text-lg font-bold ${getRiskColor(projectState.aiInsights.riskLevel).includes('red') ? 'text-red-600' : 
                    getRiskColor(projectState.aiInsights.riskLevel).includes('yellow') ? 'text-yellow-600' : 'text-green-600'}`}>
                    {projectState.aiInsights.riskLevel.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">AI Risk</p>
              </div>
            </div>

            {/* Main Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Postęp projektu</span>
                <span>{projectState.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-linear-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${projectState.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Przegląd', icon: '📊' },
                  { id: 'gantt', label: 'Gantt Chart', icon: '📅' },
                  { id: 'resources', label: 'Zasoby', icon: '👥' },
                  { id: 'collaboration', label: 'Współpraca', icon: '💬' },
                  { id: 'files', label: 'Pliki', icon: '📁' },
                  { id: 'analytics', label: 'Analityka', icon: '📈' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDetailTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeDetailTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeDetailTab === 'overview' && (
                <div className="space-y-8">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                        📝 Edytuj projekt
                      </button>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        ➕ Dodaj zadanie
                      </button>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        👥 Zaproś członka
                      </button>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                        📊 Generuj raport
                      </button>
                      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        ⚙️ Ustawienia
                      </button>
                    </div>
                  </div>

                  {/* Milestones Progress */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Kamienie milowe</h3>
                    <div className="space-y-4">
                      {projectState.milestones.map((milestone) => (
                        <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${
                                milestone.status === 'completed' ? 'bg-green-500' :
                                milestone.status === 'overdue' ? 'bg-red-500' :
                                milestone.status === 'at-risk' ? 'bg-yellow-500' : 'bg-gray-300'
                              }`}></div>
                              <h4 className="font-semibold text-gray-900">{milestone.name}</h4>
                              <span className="text-sm text-gray-500">
                                📅 {new Date(milestone.date).toLocaleDateString('pl-PL')}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">{milestone.progress}%</div>
                              <div className="text-xs text-gray-500">👤 {milestone.assignee}</div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                milestone.status === 'completed' ? 'bg-green-500' :
                                milestone.status === 'overdue' ? 'bg-red-500' :
                                'bg-blue-500'
                              }`}
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget Breakdown */}
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Podział budżetu</h3>
                      <div className="space-y-3">
                        {projectState.budget.breakdown.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{item.category}</div>
                              <div className="text-sm text-gray-500">
                                {formatCurrency(item.spent, projectState.budget.currency)} / {formatCurrency(item.allocated, projectState.budget.currency)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                {Math.round((item.spent / item.allocated) * 100)}%
                              </div>
                              <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${Math.min((item.spent / item.allocated) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Zespół i obciążenie</h3>
                      <div className="space-y-3">
                        {projectState.team.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-10 h-10 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-lg">
                                {member.avatar}
                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                  member.status === 'online' ? 'bg-green-500' :
                                  member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}></div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.role}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-semibold ${
                                member.workload > 100 ? 'text-red-600' :
                                member.workload > 80 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {member.workload}%
                              </div>
                              <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    member.workload > 100 ? 'bg-red-500' :
                                    member.workload > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(member.workload, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Real-time Collaboration Tab */}
              {activeDetailTab === 'collaboration' && (
                <div className="grid grid-cols-3 gap-6 h-[800px]">
                  {/* Live Chat */}
                  <div className="col-span-2 bg-gray-50 rounded-xl border border-gray-200 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-xl">
                      <h3 className="text-lg font-semibold text-gray-900">💬 Live Chat</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-1">
                          {projectState.team.filter(m => m.status === 'online').slice(0, 4).map((member) => (
                            <div
                              key={member.id}
                              className="w-6 h-6 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-xs border-2 border-white"
                              title={member.name}
                            >
                              {member.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{onlineUsers.length} online</span>
                      </div>
                    </div>
                    
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex items-start space-x-3 ${
                          message.user === user.name ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className="w-8 h-8 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-sm shrink-0">
                            {message.avatar}
                          </div>
                          <div className={`max-w-xs lg:max-w-md ${
                            message.user === user.name ? 'text-right' : ''
                          }`}>
                            <div className={`rounded-lg px-4 py-2 ${
                              message.type === 'system' 
                                ? 'bg-blue-100 text-blue-800 text-sm text-center' 
                                : message.user === user.name
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-white text-gray-900 border border-gray-200'
                            }`}>
                              {message.type !== 'system' && message.user !== user.name && (
                                <div className="font-semibold text-sm mb-1">{message.user}</div>
                              )}
                              <div className="text-sm">{message.content}</div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatTimeAgo(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing indicators */}
                      {isTyping.length > 0 && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 italic">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span>{isTyping.join(', ')} {isTyping.length === 1 ? 'pisze...' : 'piszą...'}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Napisz wiadomość... (użyj @nazwa aby oznaczyć)"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          📨
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>� Wskazówka: Użyj @nazwa aby oznaczyć kogoś</span>
                        <span>Enter aby wysłać</span>
                      </div>
                    </div>
                  </div>

                  {/* Notifications & Activity Panel */}
                  <div className="space-y-6">
                    {/* Notifications */}
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                          🔔 Powiadomienia 
                          {notifications.filter(n => !n.read).length > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {notifications.filter(n => !n.read).length}
                            </span>
                          )}
                        </h3>
                        {notifications.some(n => !n.read) && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-sm text-purple-600 hover:text-purple-700"
                          >
                            Oznacz wszystkie
                          </button>
                        )}
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.slice(0, 8).map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => markNotificationAsRead(notification.id)}
                            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                              !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-lg shrink-0">
                                {notification.user ? notification.avatar : getNotificationIcon(notification.type)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-semibold text-gray-900 text-sm truncate">
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                                  )}
                                </div>
                                <p className="text-gray-600 text-xs mb-1">{notification.content}</p>
                                <span className="text-xs text-gray-400">{formatTimeAgo(notification.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">📈 Ostatnia aktywność</h3>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto">
                        {projectState.activities.slice(0, 10).map((activity) => (
                          <div key={activity.id} className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <span className="text-lg shrink-0">{activity.avatar}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                                  <span className="font-semibold text-gray-900 text-sm">{activity.user}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-1">{activity.content}</p>
                                <span className="text-xs text-gray-400">{formatTimeAgo(activity.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add Comment */}
                      <div className="p-3 border-t border-gray-200">
                        <div className="space-y-2">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Dodaj komentarz do aktywności..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            rows={2}
                          />
                          <button
                            onClick={addComment}
                            disabled={!newComment.trim()}
                            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                          >
                            💬 Dodaj komentarz
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gantt Chart Tab */}
              {activeDetailTab === 'gantt' && (
                <div className="space-y-6">
                  {/* Gantt Controls */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold text-gray-900">📅 Interaktywny Gantt Chart</h3>
                      <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
                        {['days', 'weeks', 'months'].map((scale) => (
                          <button
                            key={scale}
                            onClick={() => setGanttScale(scale as any)}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                              ganttScale === scale
                                ? 'bg-purple-500 text-white'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {scale === 'days' ? 'Dni' : scale === 'weeks' ? 'Tygodnie' : 'Miesiące'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                        ➕ Dodaj zadanie
                      </button>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        🎯 Dodaj kamień milowy
                      </button>
                      <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
                        📊 Eksportuj
                      </button>
                    </div>
                  </div>

                  {/* Gantt Chart Container */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Timeline Header */}
                    <div className="border-b border-gray-200 bg-gray-50">
                      <div className="flex">
                        {/* Task Names Column */}
                        <div className="w-80 p-4 border-r border-gray-200 bg-gray-100">
                          <h4 className="font-semibold text-gray-900">Zadania & Kamienie milowe</h4>
                        </div>
                        
                        {/* Timeline Headers */}
                        <div className="flex-1 overflow-x-auto">
                          <div className="flex min-w-max">
                            {getTimelineHeaders().map((header, index) => (
                              <div 
                                key={index} 
                                className="px-3 py-4 text-xs font-medium text-gray-600 border-r border-gray-200 text-center"
                                style={{ 
                                  minWidth: ganttScale === 'days' ? '40px' : 
                                          ganttScale === 'weeks' ? '56px' : '80px' 
                                }}
                              >
                                {header.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gantt Content */}
                    <div className="max-h-96 overflow-y-auto">
                      {/* Milestones */}
                      {projectState.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex border-b border-gray-100 hover:bg-gray-50 group">
                          {/* Milestone Info */}
                          <div className="w-80 p-4 border-r border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                milestone.status === 'completed' ? 'bg-green-500' :
                                milestone.status === 'overdue' ? 'bg-red-500' :
                                milestone.status === 'at-risk' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`}></div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 text-sm truncate">🎯 {milestone.name}</div>
                                <div className="text-xs text-gray-500">{milestone.assignee}</div>
                              </div>
                              <div className="text-xs text-gray-400">{milestone.progress}%</div>
                            </div>
                          </div>
                          
                          {/* Milestone Timeline */}
                          <div className="flex-1 relative p-4">
                            <div className="relative h-8">
                              {(() => {
                                const milestoneDate = new Date(milestone.date);
                                const dayFromStart = getDaysBetween(ganttStartDate, milestoneDate);
                                const pixelsPerDay = ganttScale === 'days' ? 40 : ganttScale === 'weeks' ? 8 : 2;
                                const left = Math.max(0, dayFromStart * pixelsPerDay);
                                
                                return (
                                  <div 
                                    className={`absolute top-1 w-4 h-6 ${
                                      milestone.status === 'completed' ? 'bg-green-500' :
                                      milestone.status === 'overdue' ? 'bg-red-500' :
                                      milestone.status === 'at-risk' ? 'bg-yellow-500' : 'bg-gray-400'
                                    } transform rotate-45 shadow-sm`}
                                    style={{ left: `${left}px` }}
                                    title={`${milestone.name} - ${new Date(milestone.date).toLocaleDateString('pl-PL')}`}
                                  ></div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Tasks */}
                      {projectState.tasks.map((task) => (
                        <div 
                          key={task.id} 
                          className={`flex border-b border-gray-100 hover:bg-gray-50 group ${
                            selectedTask === task.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          {/* Task Info */}
                          <div className="w-80 p-4 border-r border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded ${getTaskStatusColor(task.status)}`}></div>
                              <div className="flex-1 min-w-0">
                                <button
                                  onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                                  className="font-medium text-gray-900 text-sm truncate hover:text-purple-600 text-left"
                                >
                                  {task.title}
                                </button>
                                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                  <span>{task.assignee}</span>
                                  <span>•</span>
                                  <span className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)} text-xs`}>
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-400">{task.progress}%</div>
                            </div>
                            
                            {/* Task Dependencies */}
                            {task.dependencies.length > 0 && (
                              <div className="mt-2 text-xs text-gray-500">
                                🔗 Zależy od: {task.dependencies.join(', ')}
                              </div>
                            )}
                          </div>
                          
                          {/* Task Timeline Bar */}
                          <div className="flex-1 relative p-4">
                            <div className="relative h-8">
                              {(() => {
                                const position = getTaskPosition(task.startDate, task.duration);
                                return (
                                  <div 
                                    className={`absolute top-2 h-4 ${getTaskStatusColor(task.status)} rounded-md shadow-sm cursor-pointer group-hover:shadow-md transition-all ${
                                      draggedTask === task.id ? 'opacity-50' : ''
                                    }`}
                                    style={{ 
                                      left: `${position.left}px`, 
                                      width: `${Math.max(position.width, 20)}px` 
                                    }}
                                    draggable
                                    onDragStart={() => setDraggedTask(task.id)}
                                    onDragEnd={() => setDraggedTask(null)}
                                    title={`${task.title} (${task.duration} dni)`}
                                  >
                                    {/* Progress indicator */}
                                    <div 
                                      className="h-full bg-white/30 rounded-md"
                                      style={{ width: `${task.progress}%` }}
                                    ></div>
                                    
                                    {/* Task label */}
                                    {position.width > 60 && (
                                      <div className="absolute inset-0 flex items-center px-2">
                                        <span className="text-xs text-white font-medium truncate">
                                          {task.title}
                                        </span>
                                      </div>
                                    )}
                                    
                                    {/* Resize handles */}
                                    <div className="absolute left-0 top-0 w-1 h-full bg-white/50 cursor-w-resize opacity-0 group-hover:opacity-100"></div>
                                    <div className="absolute right-0 top-0 w-1 h-full bg-white/50 cursor-e-resize opacity-0 group-hover:opacity-100"></div>
                                  </div>
                                );
                              })()}
                              
                              {/* Dependency Lines */}
                              {task.dependencies.map((depId) => {
                                const dependentTask = projectState.tasks.find(t => t.id === depId);
                                if (!dependentTask) return null;
                                
                                const taskPos = getTaskPosition(task.startDate, task.duration);
                                const depPos = getTaskPosition(dependentTask.startDate, dependentTask.duration);
                                
                                return (
                                  <svg 
                                    key={depId}
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ width: '100%', height: '100%' }}
                                  >
                                    <defs>
                                      <marker
                                        id="arrowhead"
                                        markerWidth="10"
                                        markerHeight="7" 
                                        refX="9"
                                        refY="3.5"
                                        orient="auto"
                                      >
                                        <polygon
                                          points="0 0, 10 3.5, 0 7"
                                          fill="#6366f1"
                                        />
                                      </marker>
                                    </defs>
                                    <line
                                      x1={depPos.left + depPos.width}
                                      y1="16"
                                      x2={taskPos.left}
                                      y2="16"
                                      stroke="#6366f1"
                                      strokeWidth="2"
                                      markerEnd="url(#arrowhead)"
                                      className="opacity-60"
                                    />
                                  </svg>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Task Details Panel */}
                  {selectedTask && (() => {
                    const task = projectState.tasks.find(t => t.id === selectedTask);
                    if (!task) return null;
                    
                    return (
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                              <span>📅 {new Date(task.startDate).toLocaleDateString('pl-PL')} - {new Date(task.endDate).toLocaleDateString('pl-PL')}</span>
                              <span>⏱️ {task.duration} dni</span>
                              <span>👤 {task.assignee}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${getTaskStatusColor(task.status)} text-white`}>
                                {task.status}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedTask(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Postęp</h5>
                            <div className="mb-2">
                              <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>Ukończenie</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Zależności</h5>
                            {task.dependencies.length > 0 ? (
                              <div className="space-y-1">
                                {task.dependencies.map((depId) => {
                                  const depTask = projectState.tasks.find(t => t.id === depId);
                                  return depTask ? (
                                    <div key={depId} className="text-sm text-gray-600 flex items-center space-x-2">
                                      <div className={`w-2 h-2 rounded-full ${getTaskStatusColor(depTask.status)}`}></div>
                                      <span>{depTask.title}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">Brak zależności</p>
                            )}
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Akcje</h5>
                            <div className="space-y-2">
                              <button className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                ✏️ Edytuj zadanie
                              </button>
                              <button className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600">
                                ➕ Dodaj podzadanie
                              </button>
                              <button className="w-full px-3 py-2 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600">
                                🔗 Zarządzaj zależnościami
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Resources Management Tab */}
              {activeDetailTab === 'resources' && (
                <div className="space-y-6">
                  {/* Resource Overview */}
                  <div className="grid grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-blue-100 rounded-lg p-2">
                          <span className="text-xl">👥</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Zespół</h3>
                          <p className="text-2xl font-bold text-blue-600">{projectState.team.length}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Członkowie projektu</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-yellow-100 rounded-lg p-2">
                          <span className="text-xl">⚡</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Avg Obciążenie</h3>
                          <p className="text-2xl font-bold text-yellow-600">
                            {Math.round(projectState.team.reduce((sum, member) => sum + member.workload, 0) / projectState.team.length)}%
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Średnie wykorzystanie</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-green-100 rounded-lg p-2">
                          <span className="text-xl">🎯</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Umiejętności</h3>
                          <p className="text-2xl font-bold text-green-600">
                            {projectState.team.reduce((sum, member) => sum + member.skills.length, 0)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Łącznie kompetencji</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-purple-100 rounded-lg p-2">
                          <span className="text-xl">🔥</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Przeciążeni</h3>
                          <p className="text-2xl font-bold text-red-600">
                            {projectState.team.filter(member => member.workload > 100).length}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Członków {'>'} 100%</p>
                    </div>
                  </div>

                  {/* Team Matrix */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">👥 Macierz zespołu i umiejętności</h3>
                        <div className="flex items-center space-x-3">
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                            ➕ Dodaj członka
                          </button>
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                            🎯 Analiza umiejętności
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-6">
                        {projectState.team.map((member) => (
                          <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <div className="relative w-12 h-12 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-xl">
                                  {member.avatar}
                                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                    member.status === 'online' ? 'bg-green-500' :
                                    member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                                  }`}></div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                  <p className="text-sm text-gray-500">{member.role}</p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-400">Status:</span>
                                    <span className={`text-xs font-medium ${
                                      member.status === 'online' ? 'text-green-600' :
                                      member.status === 'away' ? 'text-yellow-600' : 'text-gray-600'
                                    }`}>
                                      {member.status === 'online' ? '🟢 Online' :
                                       member.status === 'away' ? '🟡 Away' : '⚫ Offline'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Workload Indicator */}
                              <div className="text-right">
                                <div className={`text-xl font-bold ${
                                  member.workload > 100 ? 'text-red-600' :
                                  member.workload > 80 ? 'text-yellow-600' : 'text-green-600'
                                }`}>
                                  {member.workload}%
                                </div>
                                <div className="text-xs text-gray-500">Obciążenie</div>
                                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      member.workload > 100 ? 'bg-red-500' :
                                      member.workload > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${Math.min(member.workload, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Skills Matrix */}
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-2">🎯 Umiejętności</h5>
                              <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill, index) => (
                                  <span 
                                    key={index}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Current Tasks */}
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-2">📋 Bieżące zadania</h5>
                              <div className="space-y-2">
                                {projectState.tasks
                                  .filter(task => task.assignee === member.name && task.status !== 'completed')
                                  .slice(0, 3)
                                  .map((task) => (
                                    <div key={task.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                      <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${getTaskStatusColor(task.status)}`}></div>
                                        <span className="text-sm text-gray-700 truncate">{task.title}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)} text-white`}>
                                          {task.priority}
                                        </span>
                                        <span className="text-xs text-gray-500">{task.progress}%</span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                                ✏️ Edytuj
                              </button>
                              <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                                📋 Przypisz zadanie
                              </button>
                              <button className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600">
                                🎯 Zarządzaj umiejętnościami
                              </button>
                              {member.workload > 100 && (
                                <button className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                                  ⚠️ Zoptymalizuj obciążenie
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Workload Optimization Suggestions */}
                  <div className="bg-linear-to-r from-purple-500 to-cyan-500 rounded-xl text-white p-6">
                    <h3 className="text-xl font-semibold mb-4">🤖 AI Rekomendacje optymalizacji zasobów</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">⚠️ Zidentyfikowane problemy:</h4>
                        <ul className="space-y-1 text-sm text-purple-100">
                          <li>• Piotr Kowal jest przeciążony (95% workload)</li>
                          <li>• Brak eksperta ML do zadania "AI Integration"</li>
                          <li>• Nierównomierne rozłożenie umiejętności frontend</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">💡 Sugerowane działania:</h4>
                        <ul className="space-y-1 text-sm text-purple-100">
                          <li>• Przerzuć część zadań Piotra na Tomasza</li>
                          <li>• Rozważ zatrudnienie ML Engineer</li>
                          <li>• Przenieś Kasię na kluczowe zadania UI</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Files Management Tab */}
              {activeDetailTab === 'files' && (
                <div className="space-y-6">
                  {/* Files Header & Controls */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">📁 Zarządzanie plikami projektu</h3>
                        <p className="text-gray-600 mt-1">Centralna biblioteka dokumentów z inteligentnym przypisywaniem</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          ⬆️ Upload
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          📋 Utwórz folder
                        </button>
                        {selectedFiles.length > 0 && (
                          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                            🔗 Przypisz ({selectedFiles.length})
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-5 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{projectState.files.length}</div>
                        <div className="text-sm text-gray-500">Wszystkich plików</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(projectState.files.reduce((sum, file) => sum + getFileSize(file.size), 0) / (1024 * 1024))} MB
                        </div>
                        <div className="text-sm text-gray-500">Łączny rozmiar</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {projectState.files.filter(f => f.category === 'contract').length}
                        </div>
                        <div className="text-sm text-gray-500">Umów</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {projectState.files.filter(f => f.category === 'invoice').length}
                        </div>
                        <div className="text-sm text-gray-500">Faktur</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-cyan-600">
                          {new Set(projectState.files.flatMap(f => f.assignedTo?.filter(a => a.type === 'client').map(a => a.id) || [])).size}
                        </div>
                        <div className="text-sm text-gray-500">Przypisanych klientów</div>
                      </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
                          {[
                            { id: 'grid', icon: '⊞', label: 'Siatka' },
                            { id: 'list', icon: '☰', label: 'Lista' },
                            { id: 'timeline', icon: '📅', label: 'Timeline' }
                          ].map((mode) => (
                            <button
                              key={mode.id}
                              onClick={() => setFileViewMode(mode.id as any)}
                              className={`flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                fileViewMode === mode.id
                                  ? 'bg-purple-500 text-white'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              <span>{mode.icon}</span>
                              <span>{mode.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Category Filter */}
                        <select
                          value={fileFilter}
                          onChange={(e) => setFileFilter(e.target.value as any)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="all">Wszystkie kategorie</option>
                          <option value="document">📄 Dokumenty</option>
                          <option value="design">🎨 Design</option>
                          <option value="code">💻 Kod</option>
                          <option value="contract">📋 Umowy</option>
                          <option value="invoice">🧾 Faktury</option>
                          <option value="presentation">📊 Prezentacje</option>
                        </select>
                      </div>

                      {/* Search */}
                      <div className="relative">
                        <input
                          type="text"
                          value={fileSearchQuery}
                          onChange={(e) => setFileSearchQuery(e.target.value)}
                          placeholder="Szukaj plików, tagów..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                      </div>
                    </div>
                  </div>

                  {/* Files Content */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    {fileViewMode === 'grid' && (
                      <div className="p-6">
                        <div className="grid grid-cols-4 gap-6">
                          {filteredFiles.map((file) => (
                            <div 
                              key={file.id}
                              className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                                selectedFiles.includes(file.id) ? 'border-purple-500 bg-purple-50' : ''
                              } ${draggedFile === file.id ? 'opacity-50' : ''}`}
                              draggable
                              onDragStart={() => setDraggedFile(file.id)}
                              onDragEnd={() => setDraggedFile(null)}
                              onClick={(e) => {
                                if (e.ctrlKey || e.metaKey) {
                                  toggleFileSelection(file.id);
                                } else {
                                  setShowFileDetails(file.id);
                                }
                              }}
                            >
                              {/* File Header */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-3xl">
                                  {getFileIcon(file.type, file.category)}
                                </div>
                                <div className="flex items-center space-x-1">
                                  <input
                                    type="checkbox"
                                    checked={selectedFiles.includes(file.id)}
                                    onChange={() => toggleFileSelection(file.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-purple-500 focus:ring-purple-500"
                                  />
                                  {!file.isLatestVersion && (
                                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                      v{file.version}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* File Info */}
                              <div className="mb-3">
                                <h4 className="font-semibold text-gray-900 text-sm truncate mb-1" title={file.name}>
                                  {file.name}
                                </h4>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>{file.size}</span>
                                  <span>{formatTimeAgo(file.uploadDate)}</span>
                                </div>
                              </div>

                              {/* Category & Tags */}
                              <div className="mb-3">
                                <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(file.category)}`}>
                                  {file.category}
                                </span>
                                {file.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {file.tags.slice(0, 2).map((tag, index) => (
                                      <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                        {tag}
                                      </span>
                                    ))}
                                    {file.tags.length > 2 && (
                                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                        +{file.tags.length - 2}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Assignments */}
                              {file.assignedTo && file.assignedTo.length > 0 && (
                                <div className="text-xs text-gray-500">
                                  <div className="font-medium mb-1">Przypisane do:</div>
                                  {file.assignedTo.slice(0, 2).map((assignment, index) => (
                                    <div key={index} className="flex items-center space-x-1">
                                      <span>{assignment.type === 'client' ? '🏢' : assignment.type === 'project' ? '📋' : '✅'}</span>
                                      <span className="truncate">{assignment.name}</span>
                                    </div>
                                  ))}
                                  {file.assignedTo.length > 2 && (
                                    <div className="text-gray-400">+{file.assignedTo.length - 2} więcej</div>
                                  )}
                                </div>
                              )}

                              {/* Upload Info */}
                              <div className="border-t border-gray-100 pt-3 mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>👤 {file.uploadedBy}</span>
                                  <span>v{file.version}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fileViewMode === 'list' && (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-6 py-3 text-left">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedFiles(filteredFiles.map(f => f.id));
                                    } else {
                                      setSelectedFiles([]);
                                    }
                                  }}
                                  className="text-purple-500 focus:ring-purple-500"
                                />
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nazwa</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategoria</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rozmiar</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dodał</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Przypisania</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Akcje</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {filteredFiles.map((file) => (
                              <tr key={file.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                  <input
                                    type="checkbox"
                                    checked={selectedFiles.includes(file.id)}
                                    onChange={() => toggleFileSelection(file.id)}
                                    className="text-purple-500 focus:ring-purple-500"
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{getFileIcon(file.type, file.category)}</span>
                                    <div>
                                      <button
                                        onClick={() => setShowFileDetails(file.id)}
                                        className="font-medium text-gray-900 hover:text-purple-600 text-left"
                                      >
                                        {file.name}
                                      </button>
                                      <div className="text-xs text-gray-500">v{file.version}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(file.category)}`}>
                                    {file.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{file.size}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{file.uploadedBy}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatTimeAgo(file.uploadDate)}</td>
                                <td className="px-6 py-4">
                                  {file.assignedTo && file.assignedTo.length > 0 ? (
                                    <div className="flex items-center space-x-1">
                                      <span className="text-sm text-gray-600">{file.assignedTo.length}</span>
                                      <span className="text-xs text-gray-500">przypisań</span>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-gray-400">Brak</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-700 text-sm">📥</button>
                                    <button className="text-purple-600 hover:text-purple-700 text-sm">🔗</button>
                                    <button className="text-gray-600 hover:text-gray-700 text-sm">⚙️</button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {fileViewMode === 'timeline' && (
                      <div className="p-6">
                        <div className="relative">
                          {/* Timeline line */}
                          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                          
                          <div className="space-y-6">
                            {filteredFiles
                              .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                              .map((file, index) => (
                                <div key={file.id} className="relative flex items-start space-x-4">
                                  {/* Timeline dot */}
                                  <div className="relative z-10 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow"></div>
                                  
                                  {/* File card */}
                                  <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start space-x-3">
                                        <span className="text-2xl">{getFileIcon(file.type, file.category)}</span>
                                        <div>
                                          <button
                                            onClick={() => setShowFileDetails(file.id)}
                                            className="font-semibold text-gray-900 hover:text-purple-600"
                                          >
                                            {file.name}
                                          </button>
                                          <div className="flex items-center space-x-2 mt-1">
                                            <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(file.category)}`}>
                                              {file.category}
                                            </span>
                                            <span className="text-xs text-gray-500">{file.size}</span>
                                            <span className="text-xs text-gray-500">v{file.version}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">{file.uploadedBy}</div>
                                        <div className="text-xs text-gray-500">{formatDateTime(file.uploadDate)}</div>
                                      </div>
                                    </div>
                                    
                                    {file.assignedTo && file.assignedTo.length > 0 && (
                                      <div className="mt-3 flex flex-wrap gap-2">
                                        {file.assignedTo.map((assignment, idx) => (
                                          <span key={idx} className="inline-flex items-center space-x-1 px-2 py-1 bg-white rounded-full text-xs border">
                                            <span>{assignment.type === 'client' ? '🏢' : assignment.type === 'project' ? '📋' : '✅'}</span>
                                            <span>{assignment.name}</span>
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* File Details Modal/Panel */}
                  {showFileDetails && (() => {
                    const file = projectState.files.find(f => f.id === showFileDetails);
                    if (!file) return null;
                    
                    return (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                          <div className="p-6 border-b border-gray-200">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4">
                                <span className="text-4xl">{getFileIcon(file.type, file.category)}</span>
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900">{file.name}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <span>{file.size}</span>
                                    <span>•</span>
                                    <span>Wersja {file.version}</span>
                                    <span>•</span>
                                    <span>Dodał {file.uploadedBy}</span>
                                    <span>•</span>
                                    <span>{formatDateTime(file.uploadDate)}</span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => setShowFileDetails(null)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="grid grid-cols-3 gap-6">
                              {/* File Info */}
                              <div className="col-span-2 space-y-6">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3">📋 Szczegóły pliku</h4>
                                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Kategoria:</span>
                                      <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(file.category)}`}>
                                        {file.category}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Typ pliku:</span>
                                      <span className="font-mono text-sm">{file.type}</span>
                                    </div>
                                    {file.metadata?.pages && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Liczba stron:</span>
                                        <span>{file.metadata.pages}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Najnowsza wersja:</span>
                                      <span>{file.isLatestVersion ? '✅ Tak' : '❌ Nie'}</span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3">🏷️ Tagi</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {file.tags.map((tag, index) => (
                                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3">🔗 Przypisania</h4>
                                  {file.assignedTo && file.assignedTo.length > 0 ? (
                                    <div className="space-y-2">
                                      {file.assignedTo.map((assignment, index) => (
                                        <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                                          <span className="text-xl">
                                            {assignment.type === 'client' ? '🏢' : assignment.type === 'project' ? '📋' : '✅'}
                                          </span>
                                          <div>
                                            <div className="font-medium text-gray-900">{assignment.name}</div>
                                            <div className="text-sm text-gray-500 capitalize">{assignment.type}</div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 italic">Brak przypisań</p>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">⚡ Akcje</h4>
                                <div className="space-y-3">
                                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                    📥 Pobierz
                                  </button>
                                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                    👁️ Podgląd
                                  </button>
                                  <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                    🔗 Przypisz do...
                                  </button>
                                  <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                                    ✏️ Edytuj metadane
                                  </button>
                                  <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                    📤 Udostępnij
                                  </button>
                                  <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                    🗑️ Usuń
                                  </button>
                                </div>

                                <div className="mt-6">
                                  <h5 className="font-medium text-gray-900 mb-2">🔒 Uprawnienia</h5>
                                  <div className="text-sm space-y-1">
                                    <div><strong>Podgląd:</strong> {file.permissions.canView.join(', ')}</div>
                                    <div><strong>Edycja:</strong> {file.permissions.canEdit.join(', ')}</div>
                                    <div><strong>Usuwanie:</strong> {file.permissions.canDelete.join(', ')}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Placeholder for remaining tabs */}
              {!['overview', 'collaboration', 'gantt', 'resources', 'files'].includes(activeDetailTab) && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {activeDetailTab === 'analytics' && 'Zaawansowana analityka'}
                  </h3>
                  <p className="text-gray-600">Ta sekcja zostanie zaimplementowana w kolejnym kroku</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
