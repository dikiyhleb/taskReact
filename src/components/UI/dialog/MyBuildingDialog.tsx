import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import BuildingEntity from "../../../models/BuildingEntity";

interface MyBuildingDialogType {
  data: BuildingEntity | null;
  open: boolean;
  onClose: () => void;
}

export default function MyBuildingDialog(props: MyBuildingDialogType) {
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>{props.data?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Divider>ID {props.data?.id}</Divider>
            <Divider>Адрес {props.data?.address}</Divider>
            <Divider>Дата регистрации {props.data?.registration_date}</Divider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
