import { LoginModalComponent } from './login-modal.component';

export class LoginModalService {

  registeredDialog: LoginModalComponent;

  register(dialog) {
    this.registeredDialog = dialog;
  }

  show() {
    return new Promise<void>((resolve, reject) => {
      this.registeredDialog.show();
      this.registeredDialog.onOk.subscribe(() => {
        this.registeredDialog.hide();
        resolve();
      });
      this.registeredDialog.onCancel.subscribe(() => {
        this.registeredDialog.hide();
        reject();
      });

    });
  }

}