import { inject, signal } from "@angular/core";
import { ApiResponseOfPaginatedListOfUserDto } from "../../../api/api-client";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { UserService } from "../services/user.service";

export const initialStateUser: ApiResponseOfPaginatedListOfUserDto = {
    success: true,
    message: '',
    data: {
        items: [],
        pageIndex: 1,
        totalPages: 0,
        totalCount: 0,
        pageSize: 10,
        hasPreviousPage: false,
        hasNextPage: false
    }
}

export const UsersStore = signalStore(
    { providedIn: 'root' },
    withState(initialStateUser),

    withMethods((store) => {
        const userService = inject(UserService);

        return {
            loadUsers() {
                const pageNumber = store.data()?.pageIndex;
                const pageSize = store.data()?.pageSize;

                try {
                    userService.getUsers(pageNumber, pageSize)
                        .subscribe({
                            next: (res) => {
                                patchState(store, () => res);
                            }
                        })
                } catch (error) {
                    console.error("Erreur lors du chargement", error);
                }
            }
        }
    })
)