import * as React from 'react';
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

export default function ListUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(UserContext);
  const { users, getUsers, adminUser, deleteUser } = userCtx;

  let initialRows = [];
  useEffect(() => {
    setIsLoading(true);
    getUsers();
    setIsLoading(false);
  }, [initialRows]);
  
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

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    const editedUser = await rows.filter((row) => row.id === id);
    console.log(editedUser)
    await adminUser(editedUser)
    initialRows = [];
  };
  
  const handleDeleteClick = (id) => async () => {
    //setRows(rows.filter((row) => row.id !== id));
    const deletedUser = await rows.filter((row) => row.id === id);
    console.log(deletedUser)
    await adminUser(deletedUser)
    initialRows = [];
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
                  color: 'primary.main',
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
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
          loading={isLoading}
          localeText={{
            toolbarQuickFilterPlaceholder: 'Search commodities',
          }}
        />
      </Box>
    </Container>
  )
}
