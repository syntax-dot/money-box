import {createInjectable} from "~/composition/create-injectable";
import {useAuth} from "~/composables/use-auth";

export const userAuthInjectable = createInjectable(useAuth)
