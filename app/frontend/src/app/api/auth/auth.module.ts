import { NgModule } from "@angular/core";

import { UserModule } from "../user";
import { AuthService } from "./auth.service";

@NgModule({
	imports: [UserModule],
	providers: [AuthService]
})
export class AuthModule {
}
