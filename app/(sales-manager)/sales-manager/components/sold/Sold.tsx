"use client"
import React from 'react'
import exportFromJSON from 'export-from-json'
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, Button, Text } from '@mantine/core';
import dateFormat from 'dateformat';
import Image from 'next/image';

const columns = [
  {
    accessorKey: 'seller.fullName',
    header: 'Seller Name',
    size: 40,
  },
  {
    accessorKey: 'partId',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'name',
    header: 'Part Name',
    size: 100,
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
    size: 100,
  },
  {
    accessorKey: 'condition',
    header: 'Condition',
    size: 100,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    Cell: ({ cell }: any) => cell.getValue() + " ₾",
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    Cell: ({ cell }: any) => dateFormat(cell.getValue(), 'dd/mm/yyyy hh:MM'),
  },
  {
    accessorKey: 'payment.createdAt',
    header: 'Selled Time',
    Cell: ({ cell }: any) => dateFormat(cell.getValue(), 'dd/mm/yyyy hh:MM'),
  },
  {
    accessorKey: 'payment.type',
    header: 'Payment Type',
  },
  {
    accessorKey: 'payment.name',
    header: 'Buyer Name',
  },
  {
    accessorKey: 'payment.phone',
    header: 'Buyer Phone',
  },
]

const handleExportPDF = async (rows: any[]) => {
      const doc = new jsPDF();

      doc.addFont('/fonts/NotoSansGeorgian.ttf', 'NotoSansGeorgian', 'normal');
      const tableData = rows.map((row: any) => columns.map((c) => {
          const keys = c.accessorKey.split('.');
          let value = row.original;
          for (const key of keys) {
              value = value[key];
          }

          if (c.accessorKey === 'price') {
              value = value + ' ₾';
          }
          return value;
      }));

      const tableHeaders = columns.map((c) => c.header);

      doc.setFont("NotoSansGeorgian");
      autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
          tableWidth: 'wrap',
          margin: { top: 20 },
          bodyStyles: {
            font: 'NotoSansGeorgian',
          },
        
      });

      doc.save(`export=${new Date()}.pdf`);
};

const handleExportCSV = (rows: any) => {
  const fileName = `export=${new Date()}`;
  const exportType = exportFromJSON.types.csv;

  const tableHeaders = columns.map((c) => c.header);
  const tableData = rows.map((row: any) => columns.map((c) => {
    
    const keys = c.accessorKey.split('.');
    
    let value = row.original;
    for (const key of keys) {
      value = value[key];
    }
    
    if (c.accessorKey === 'price') {
      value = value + ' ₾';
    }
    return value;
  }));

  const data = [
    tableHeaders,
    ...tableData 
  ];

  exportFromJSON({ data, fileName, exportType });
};

export default function Sold({
  data
} : {
  data: any
}) {
  return (
    <>
      <MantineReactTable table={useMantineReactTable({
        columns,
        data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        renderTopToolbarCustomActions: ({ table }) => (
          <Box>
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                padding: '8px',
                flexWrap: 'wrap',
              }}
            >
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() =>
                  handleExportPDF(table.getPrePaginationRowModel().rows)
                }
                leftIcon={<Image src={'/icons/pdf.png'} alt='PDF' width={25} height={25}/>}
                variant="default"
              >
                Export All to PDF
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                onClick={() => {
                  handleExportPDF(table.getRowModel().rows)
                }}
                leftIcon={<Image src={'/icons/pdf.png'} alt='PDF' width={25} height={25}/>}
                variant="default"
              >
                Export Page to PDF
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                }
                onClick={() => {
                  handleExportPDF(table.getSelectedRowModel().rows)
                }}
                leftIcon={<Image src={'/icons/pdf.png'} alt='PDF' width={25} height={25}/>}
                variant="default"
              >
                Export Selected to PDF
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                padding: '8px',
                flexWrap: 'wrap',
              }}
            >
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() =>
                  handleExportCSV(table.getPrePaginationRowModel().rows)
                }
                leftIcon={<Image src={'/icons/excel.png'} alt='EXCEL' width={25} height={25}/>}
                variant="default"
              >
                Export All to Excel
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                onClick={() => {
                  handleExportCSV(table.getRowModel().rows)
                }}
                leftIcon={<Image src={'/icons/excel.png'} alt='EXCEL' width={25} height={25}/>}
                variant="default"
              >
                Export Page to Excel
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                }
                onClick={() => {
                  handleExportCSV(table.getSelectedRowModel().rows)
                }}
                leftIcon={<Image src={'/icons/excel.png'} alt='EXCEL' width={25} height={25}/>}
                variant="default"
              >
                Export Selected to Excel
              </Button>
            </Box>
          </Box>
        ),
      })}
    />
    </>
  )
}
