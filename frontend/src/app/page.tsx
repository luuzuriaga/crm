'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import ModernKanban from '@/components/dashboard/modern-kanban';
import ContactTable from '@/components/dashboard/contact-table';
import KPICards from '@/components/dashboard/kpi-cards';
import ActivityFeed from '@/components/dashboard/activity-feed';
import { ModernChat } from '@/components/dashboard/modern-chat';
import { ConversationList } from '@/components/dashboard/conversation-list';
import AnalyticsView from '@/components/dashboard/analytics-view';
import { useCRMStore } from '@/store/useCRMStore'; // Still using for activeContact ID
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter, Download, Command, Bell, Home as HomeIcon } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { exportContactsToCSV, exportContactsToPDF } from '@/lib/export-utils';
import EmailComposer from '@/components/dashboard/email-composer';
import TaskList from '@/components/dashboard/task-list';
import SettingsView from '@/components/dashboard/settings-view';
import HomeView from '@/components/dashboard/home-view';
import EmailsView from '@/components/dashboard/emails-view';
import CommandMenu from '@/components/dashboard/command-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateLeadModal from '@/components/dashboard/create-lead-modal';
import EditContactModal from '@/components/dashboard/edit-contact-modal';
import { useContacts } from '@/hooks/use-contacts';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      staggerChildren: 0.1 
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createDefaultStage, setCreateDefaultStage] = useState('lead');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<any>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailTargetContact, setEmailTargetContact] = useState<any>(null);
  
  const { activeContact } = useCRMStore();
  const { data: contacts = [] } = useContacts();

  const handleExport = () => {
    exportContactsToCSV(contacts);
    toast.success('Contactos exportados a CSV con éxito');
  };

  const handleOpenCreateModal = (stage: string = 'lead') => {
    setCreateDefaultStage(stage);
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (contact: any) => {
    setContactToEdit(contact);
    setIsEditModalOpen(true);
  };

  const tabLabels: Record<string, string> = {
    home: 'Inicio',
    dashboard: 'Tablero',
    contacts: 'Contactos',
    chats: 'Mensajes',
    emails: 'Centro de Email',
    analytics: 'Analíticas',
    settings: 'Configuración'
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 antialiased">
      <Toaster position="top-right" theme="dark" closeButton />
      
      <CommandMenu 
        open={isCommandMenuOpen} 
        setOpen={setIsCommandMenuOpen} 
        onTabChange={setActiveTab}
        onCreateLead={() => handleOpenCreateModal()}
      />

      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSearchClick={() => setIsCommandMenuOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background/30 backdrop-blur-3xl relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <header className="h-16 border-b border-border/10 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary/80 flex items-center gap-2">
              {activeTab === 'home' && <HomeIcon className="h-3.5 w-3.5" />}
              {tabLabels[activeTab] || activeTab}
            </h2>
            <div className="relative hidden md:flex items-center">
              <span className="absolute left-3 text-muted-foreground/40">
                <Search className="h-3.5 w-3.5" />
              </span>
              <Input 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 w-64 bg-muted/20 border-border/5 pl-9 text-xs focus-visible:ring-primary/20 placeholder:text-muted-foreground/30"
              />
              <div className="absolute right-2 hidden lg:flex items-center gap-1 opacity-20">
                <Command className="h-2.5 w-2.5" />
                <span className="text-[10px] font-bold">K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger className="h-8 w-8 relative flex items-center justify-center rounded-md hover:bg-muted/40 transition-colors border border-border/10 text-muted-foreground hover:text-foreground outline-none">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                </PopoverTrigger>
               <PopoverContent className="w-80 p-0 overflow-hidden border-border/10 shadow-2xl bg-card/95 backdrop-blur-xl" align="end">
                 <div className="max-h-[500px] overflow-hidden">
                    <ActivityFeed />
                 </div>
               </PopoverContent>
             </Popover>

             <DropdownMenu>
               <DropdownMenuTrigger className="h-8 text-xs gap-2 border border-border/10 bg-muted/20 hover:bg-muted/40 font-semibold px-3 rounded-md flex items-center transition-colors cursor-pointer outline-none">
                 <Download className="h-3.5 w-3.5" /> Exportar
               </DropdownMenuTrigger>
               <DropdownMenuContent className="bg-popover border-border/10">
                 <DropdownMenuItem onClick={handleExport} className="text-xs cursor-pointer gap-2">
                   CSV <span className="text-[10px] text-muted-foreground ml-auto">.csv</span>
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => exportContactsToPDF(contacts)} className="text-xs cursor-pointer gap-2">
                   PDF <span className="text-[10px] text-muted-foreground ml-auto">.pdf</span>
                 </DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>

             <Button 
                size="sm" 
                onClick={() => handleOpenCreateModal()}
                className="h-8 text-xs gap-2 shadow-lg shadow-primary/20 font-semibold px-4 transition-all hover:scale-105 active:scale-95"
             >
               <Plus className="h-3.5 w-3.5" /> Crear Nuevo
             </Button>
          </div>
        </header>

        {/* Content Section */}
        <div className="flex-1 overflow-hidden p-8 flex gap-8 z-10">
          {/* Main Display View */}
          <div className="flex-1 flex flex-col min-w-0 gap-8 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col gap-8 h-full"
              >
                {activeTab === 'home' && (
                  <motion.div variants={itemVariants}>
                    <HomeView />
                  </motion.div>
                )}
                {activeTab === 'dashboard' && (
                  <>
                    <motion.div variants={itemVariants}>
                      <KPICards />
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex-1 min-h-0">
                      <ModernKanban 
                        searchTerm={searchTerm} 
                        onCreateClick={handleOpenCreateModal}
                        onEditClick={handleOpenEditModal}
                      />
                    </motion.div>
                  </>
                )}

                {activeTab === 'contacts' && (
                  <div className="flex flex-col gap-6">
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight">Contactos Activos</h3>
                        <p className="text-xs text-muted-foreground mt-1">Gestiona y monitorea todas las interacciones de tus clientes.</p>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary opacity-50" />
                          <Input 
                            placeholder="Buscar nombre o correo..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-9 w-full bg-card/40 border-border/10 pl-9 text-xs rounded-xl focus-visible:ring-primary/20 placeholder:text-muted-foreground/40"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toast.info('Funcionalidad de filtrado en optimización.')}
                          className="h-9 text-xs gap-2 text-muted-foreground hover:text-foreground border border-border/5 rounded-xl px-4"
                        >
                          <Filter className="h-3.5 w-3.5" /> Filtrar
                        </Button>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <ContactTable 
                        searchTerm={searchTerm} 
                        onEditClick={handleOpenEditModal}
                      />
                    </motion.div>
                  </div>
                )}
                
                {activeTab === 'chats' && (
                  <div className="flex-1 flex overflow-hidden">
                    <div className="w-[320px] shrink-0 border-r border-border/10">
                      <ConversationList />
                    </div>
                    <div className="flex-1 bg-background/10 relative">
                      <ModernChat 
                        contact={activeContact} 
                        onEmailClick={activeContact ? () => {
                          setEmailTargetContact(activeContact);
                          setIsEmailModalOpen(true);
                        } : undefined}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'emails' && (
                  <motion.div variants={itemVariants} className="h-full">
                    <EmailsView />
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div variants={itemVariants}>
                    <AnalyticsView />
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div variants={itemVariants}>
                    <SettingsView />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className={cn(
            "w-[390px] shrink-0 h-full hidden xl:flex flex-col border-l border-border/10 transition-all duration-500 bg-background/40 backdrop-blur-xl overflow-hidden",
            (activeTab === 'chats' || activeTab === 'emails' || activeTab === 'home') ? "translate-x-full absolute right-0 opacity-0 pointer-events-none" : "relative translate-x-0 opacity-100"
          )}>
            <div className="flex-1 min-h-0">
              <ModernChat contact={activeContact} />
            </div>
          </aside>
        </div>
      </main>

      {/* Global Modals */}
      <CreateLeadModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        defaultStage={createDefaultStage}
      />

      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setContactToEdit(null);
        }}
        contact={contactToEdit}
      />

      {/* Email Modal */}
      <div className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-all duration-500",
        isEmailModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "w-full max-w-2xl h-[600px] transition-transform duration-500",
          isEmailModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
        )}>
          <EmailComposer 
            contact={emailTargetContact} 
            onClose={() => setIsEmailModalOpen(false)} 
          />
        </div>
      </div>
    </div>
  );
}

function ZapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.71 14.71 4 11 11h9L9 20l3.71-7h-8.71Z" />
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
