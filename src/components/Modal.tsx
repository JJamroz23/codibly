import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Product } from "../store/slices/productsSlice";

interface ProductModalProps {
  item: Product | null;
  closeModal: () => void;
}

const ProductModal = ({ closeModal, item }: ProductModalProps) => {
  if (!item) return null;

  return (
    <Box>
      <Dialog
        open
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle textAlign="center">
          <b>{item.name}</b>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography component="span">
                <b>id:</b> {item.id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography component="span">
                <b>name:</b> {item.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography component="span">
                <b>year:</b> {item.year}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography component="span">
                <b>color:</b> {item.color}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography component="span">
                <b>pantone value:</b> {item.pantone_value}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant="contained">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductModal;
