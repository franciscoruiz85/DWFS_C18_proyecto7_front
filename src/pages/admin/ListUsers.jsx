import { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/user/UserContext'
import {
  Container,
  Grid,
  Typography,
  Box
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid'
import { esES } from '@mui/x-data-grid/locales'

export default function ListUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(UserContext);
  const { users, getUsers, adminUser, deleteUser } = userCtx;

  let initialRows = [];
  useEffect(() => {
    setIsLoading(true);
    getUsers();
    setIsLoading(false);
  }, [isLoading]);
  
  initialRows = users.map(user => ({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  }));

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    const editedUser = await rows.filter((row) => row.id === id);
    await adminUser(editedUser);

    initialRows = [];
    setIsLoading(true);
  };
  
  const handleDeleteClick = (id) => async () => {
    await deleteUser(id);
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
    { field: 'username', headerName: 'Nombre', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Administrador', 'Usuario'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: 'green',
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              material={{
                sx: {
                  color: 'red',
                },
              }}
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            color='primary'
            onClick={handleEditClick(id)}
          />,
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
          Usuarios
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
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          loading={isLoading}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Container>
  )
}
