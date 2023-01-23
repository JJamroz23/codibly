import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
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
        <DialogTitle>{item.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <Typography component="span">{item.id}</Typography>
            </Grid>

            <Grid item>
              <Typography component="span">{item.name}</Typography>
            </Grid>
            <Grid item>
              <Typography component="span">{item.year}</Typography>
            </Grid>
            <Grid item>
              <Typography component="span">{item.color}</Typography>
            </Grid>
            <Grid item>
              <Typography component="span">{item.pantone_value}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeModal}>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductModal;
