import { jsPDF } from 'jspdf';

export const exportContactsToCSV = (contacts: any[]) => {
  if (!contacts.length) return;

  const headers = ['Name', 'Email', 'Phone', 'Stage', 'Status', 'Tags'];
  const rows = contacts.map(c => [
    c.name,
    c.email,
    c.phone,
    c.funnel_stage,
    c.status || 'active',
    c.tags
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.map(cell => `"${cell || ''}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `crm_contacts_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportContactsToPDF = (contacts: any[]) => {
  if (!contacts.length) return;

  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.text('CRM - Listado de Contactos', 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Fecha de exportación: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Table-like structure
  let y = 45;
  doc.setFontSize(12);
  doc.setTextColor(20);
  doc.setFont('helvetica', 'bold');
  
  const headers = ['Nombre', 'Email', 'Etapa'];
  doc.text(headers[0], 20, y);
  doc.text(headers[1], 70, y);
  doc.text(headers[2], 150, y);
  
  y += 10;
  doc.setDrawColor(200);
  doc.line(20, y - 5, 190, y - 5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  contacts.forEach((c, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    doc.text(c.name || '-', 20, y);
    doc.text(c.email || '-', 70, y);
    doc.text(c.funnel_stage || '-', 150, y);
    
    y += 8;
  });
  
  doc.save(`crm_contacts_${new Date().toISOString().split('T')[0]}.pdf`);
};
