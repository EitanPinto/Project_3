import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModalState, setPopUpModalAction } from '../../../store/reducers/modalReducer';
import { authState } from '../../../store/reducers/authReducer';
import { VacationsState } from '../../../store/reducers/vacationsReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { store } from '../../../store';

export default function AlertDialogModal() {
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(setPopUpModalAction({modalActionToggle: false}));
  };
  const modalState: ModalState = useAppSelector((state:{
    authorization: authState;
    vacations: VacationsState;
    popUpModal: ModalState;
}) => state.popUpModal);
  const { modalActionToggle, headerText, bodyText } = modalState;


  return (
    <div>
      <Dialog
        open={modalActionToggle}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {headerText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {bodyText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="gradient-custom-2" style={{color:"white"}} onClick={handleClose} autoFocus>
            Close 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
