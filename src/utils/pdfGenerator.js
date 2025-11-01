import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateClaimPDF = (caseData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(159, 98, 237);
  doc.text('SaluLink Chronic Treatment Claim', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;

  // Clinical Note
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Clinical Note:', 20, yPosition);
  yPosition += 7;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  const splitNote = doc.splitTextToSize(caseData.clinicalNote, pageWidth - 40);
  doc.text(splitNote, 20, yPosition);
  yPosition += (splitNote.length * 5) + 10;

  // Confirmed Condition
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Confirmed Condition:', 20, yPosition);
  yPosition += 7;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(caseData.confirmedCondition || 'N/A', 20, yPosition);
  yPosition += 10;

  // ICD-10 Codes
  if (caseData.selectedICDCodes && caseData.selectedICDCodes.length > 0) {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('ICD-10 Codes:', 20, yPosition);
    yPosition += 7;

    const icdTableData = caseData.selectedICDCodes.map(icd => [
      icd.code,
      icd.description
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [['Code', 'Description']],
      body: icdTableData,
      theme: 'grid',
      headStyles: { fillColor: [159, 98, 237] },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 10;
  }

  // Diagnostic Basket
  if (caseData.diagnosticBasket && caseData.diagnosticBasket.length > 0) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Diagnostic Basket:', 20, yPosition);
    yPosition += 7;

    const diagnosticTableData = caseData.diagnosticBasket.map(item => [
      item.description,
      item.code,
      item.quantity || item.covered
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [['Procedure/Test', 'Code', 'Quantity']],
      body: diagnosticTableData,
      theme: 'grid',
      headStyles: { fillColor: [159, 98, 237] },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 10;
  }

  // Management Basket
  if (caseData.managementBasket && caseData.managementBasket.length > 0) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Ongoing Management Basket:', 20, yPosition);
    yPosition += 7;

    const managementTableData = caseData.managementBasket.map(item => [
      item.description,
      item.code,
      item.quantity || item.covered
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [['Procedure/Test', 'Code', 'Quantity']],
      body: managementTableData,
      theme: 'grid',
      headStyles: { fillColor: [159, 98, 237] },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 10;
  }

  // Selected Medications
  if (caseData.selectedMedications && caseData.selectedMedications.length > 0) {
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Selected Medications:', 20, yPosition);
    yPosition += 7;

    const medicationTableData = caseData.selectedMedications.map(med => [
      med.medicineName,
      med.activeIngredient,
      med.medicineClass,
      med.cdaCore
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [['Medicine Name', 'Active Ingredient', 'Class', 'CDA']],
      body: medicationTableData,
      theme: 'grid',
      headStyles: { fillColor: [159, 98, 237] },
      margin: { left: 20, right: 20 },
      styles: { fontSize: 8 }
    });

    yPosition = doc.lastAutoTable.finalY + 10;
  }

  // Registration Note
  if (caseData.registrationNote) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Registration Note:', 20, yPosition);
    yPosition += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const splitRegNote = doc.splitTextToSize(caseData.registrationNote, pageWidth - 40);
    doc.text(splitRegNote, 20, yPosition);
  }

  // Save the PDF
  const filename = `SaluLink_Claim_${Date.now()}.pdf`;
  doc.save(filename);
  
  return filename;
};

