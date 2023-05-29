

function exportToPNG() {
    const canvas = document.getElementById('piechart');
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function exportToCSV() {
    const chartData = chart.data;
    const csvContent = Papa.unparse(chartData);
    const link = document.createElement('a');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'chart.csv';
    link.click();
  }

  
  function exportToPDF() {
    const chartCanvas = document.getElementById('piechart');
    const chartImage = chartCanvas.toDataURL('image/png');
    const doc = new jsPDF();
    doc.addImage(chartImage, 'PNG', 10, 10, 190, 100);
    doc.save('chart.pdf');
    console.log("a mers");
  }

  
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("export-png").addEventListener("click", exportToPNG);
    document.getElementById("export-csv").addEventListener("click", exportToCSV);
    document.getElementById("export-pdf").addEventListener("click", exportToPDF);
  });
  