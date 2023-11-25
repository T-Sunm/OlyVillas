import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FavouritesResidency } from '../api/Residency'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setFavResidenciesID, setUserInfo } from "../store/slices/AuthSlice";
import { updateFavourites } from "../utils/common";
const useFavourite = (ResidencyId, currentUser) => {
    const queryClient = useQueryClient();

    const dispatch = useDispatch()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favResidenciesID || [];

        return list.includes(ResidencyId);
    }, [currentUser, ResidencyId]);

    console.log(currentUser.email)
    const { mutate } = useMutation({
        mutationFn: (id) => FavouritesResidency(id, currentUser.email),
        onSuccess: () => {
            dispatch(setFavResidenciesID(ResidencyId)),
                queryClient.invalidateQueries(["allProperties"]);
            toast.success('Success');
        }
    }
    );

    const toggleFavourite = useCallback((e, id) => {
        e.stopPropagation();
        mutate(id);
    }, [mutate]);

    return { hasFavorited, toggleFavourite };
};

export default useFavourite;