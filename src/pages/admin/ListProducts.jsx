import { useContext, useEffect, useState } from 'react'
import ProductContext from '../../contexts/product/ProductContext'
import { Link } from "react-router-dom";
import { formatCLP } from "../../utils/formatCLP"
import {
  Container,
  Grid,
  Typography,
  Box
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem
} from '@mui/x-data-grid'
import { esES } from '@mui/x-data-grid/locales'

export default function ListProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const prodCtx = useContext(ProductContext);
  const { products, getProducts, deleteProduct } = prodCtx;

  let initialRows = [];
  useEffect(() => {
    setIsLoading(true);
    getProducts();
    setIsLoading(false);
  }, [isLoading]);
  
  initialRows = products.map(prod => ({
    id: prod._id,
    productname: prod.productname,
    type: prod.type,
    price: formatCLP(prod.price)
  }));

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleDeleteClick = (id) => async () => {
    await deleteProduct(id)
    setRows(rows.filter((row) => row.id !== id));

    initialRows = [];
    setIsLoading(true);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'productname', headerName: 'Producto', width: 300 },
    { field: 'type', headerName: 'Tipo', width: 300 },
    { field: 'price', headerName: 'Precio', width: 300 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <Link
            to="/editar-producto" 
            style={{ textDecoration: "none", color: "inherit" }}
            state={{
              product_id: id
            }}
          >
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              color='primary'
            />
          </Link>,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            material={{
              sx: {
                color: 'red',
              },
            }}
            onClick={handleDeleteClick(id)}
          />
        ];
      }
    }
  ];

  return (
    <Container>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Productos
        </Typography>
      </Grid>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          loading={isLoading}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Container>
  )
}
