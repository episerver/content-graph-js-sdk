type StorageType = 'session' | 'local';

interface UseStorageReturnValue {
    getItem: (key: string, type?: StorageType) => string;
    setItem: (key: string, value: string, type?: StorageType) => boolean;
    removeItem: (key: string, type?: StorageType) => void;
}

const useStorage = (): UseStorageReturnValue => {
    const isBrowser = typeof window !== 'undefined';
    const storageType = (type?: StorageType): 'sessionStorage' | 'localStorage' => `${type ?? 'session'}Storage`;

    const getItem: UseStorageReturnValue['getItem'] = (key, type) => {
        return isBrowser ? window[storageType(type)][key] : '';
    };

    const setItem: UseStorageReturnValue['setItem'] = (key, value, type) => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, value);
            return true;
        }
        return false;
    };

    const removeItem: UseStorageReturnValue['removeItem'] = (key, type) => {
        window[storageType(type)].removeItem(key);
    };

    return {
        getItem,
        setItem,
        removeItem,
    };
};

export default useStorage;
