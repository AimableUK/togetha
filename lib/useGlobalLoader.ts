import { useState } from "react";

type LoadingMap = Record<string, boolean>;

export function useGlobalLoader() {
    const [loadingButtons, setLoadingButtons] = useState<LoadingMap>({});

    const startLoading = (id: string) => {
        setLoadingButtons((prev) => ({ ...prev, [id]: true }));
    };

    const stopLoading = (id: string) => {
        setLoadingButtons((prev) => ({ ...prev, [id]: false }));
    };

    const isButtonLoading = (id: string) => !!loadingButtons[id];

    return { startLoading, stopLoading, isButtonLoading };
}
