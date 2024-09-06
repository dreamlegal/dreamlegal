import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          height: '100%',
          margin: 0,
          borderRadius: 0,
        },
      }}
    >
      {title && (
        <DialogTitle>
          {title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent style={{ padding: 0, height: 'calc(100% - 64px)' }}>
        {children}
      </DialogContent>
      <DialogActions style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
