import {createInjectable} from "~/utils/composition/create-injectable";
import {useAuth} from "~/composables/use-auth";

export const userAuthInjectable = createInjectable(useAuth)
