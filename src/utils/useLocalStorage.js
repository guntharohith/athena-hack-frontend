import {useState,useEffect} from 'react'
// function useLocalStorage(key, initialState) {
//     const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
//     const updatedSetValue = useCallback(
//         newValue => {
//             if (newValue === initialState || typeof newValue === 'undefined') {
//                 localStorage.removeItem(key);
//             } else {
//                 localStorage.setItem(key, newValue);
//             }
//             setValue(newValue ?? initialState);
//         },
//         [initialState, key]
//     );
//     return [value, updatedSetValue];
// }
// export default useLocalStorage
export default function useLocalStorage(key, initialCode) {

    const [code, setCode] = useState(() => {
        const jsonCode = localStorage.getItem(key)
        if (jsonCode != null) return jsonCode

        if (typeof initialCode === 'function') {
            return initialCode()
        } else {
            return initialCode
        }
    })

    useEffect(() => {
        localStorage.setItem(key, code)
    }, [key, code])

    return [code, setCode]
}
