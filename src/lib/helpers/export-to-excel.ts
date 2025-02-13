import * as XLSX from 'xlsx';


export const exportToExcel = (data: Record<string,unknown>[]): void => {
  try {
    if (!data || !data.length) {
      console.error('No data provided for export');
      return;
    }


    // Generate filename based on current date

    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const fileName = `export_${formattedDate}.xlsx`;

    // Get headers from first object

    const headers = Object.keys(data[0]);

    // Create worksheet

    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: headers
    });

    // Create workbook

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert workbook to array buffer

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create blob from array buffer

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create download link

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Trigger download

    document.body.appendChild(link);
    link.click();

    // Cleanup

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
};