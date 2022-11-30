## REACT PROJECT
1. first
   npx create-react-app new01 --template typescript
   npm i --save bootstrap
   npm i reactstrap
   npm i react-toastify
   npm i react-icons

   npm i react-router-dom

   npm i react-redux
   npm i @reduxjs/toolkit

   npm i axios
#
2. index.js
   import 'bootstrap/dist/css/bootstrap.min.css';
#

3. src/services/authApi.ts dosyası oluştur.
   login ve logout methodlarını içerir.

#
4.  redux
    a) src/features/auth/authSlice.ts dosyası oluştur.

          login ve logout isimli iki method içerir ve servisteki aynı isimli metodları çağırır.

    b) src/app/store.ts
    eklenen her reducer buraya da eklenir.

        export const store = configureStore({

            reducer: {
                auth:authReducer
            }
        })

        //typescript için aşağıdaki iki değer export edilir
        export type AppDispatch = typeof store.dispatch;
        export type RootState = ReturnType<typeof store.getState>;
        //bunları aşağıdaki şekilde kullanırız. (Header.tsx mesela)

        const dispatch=useDispatch<AppDispatch>();
        const {user}=useSelector((state:RootState)=>state.auth)


    
    c) index.tsx dosyasınına redux ekle

        import { store } from './app/store'
        import { Provider } from 'react-redux'

        <Provider store={store}>
            <App />
        </Provider>
#

5. src/components/Header.tsx ekle



#
6. src/pages klasörüne 
    a) Login.tsx
    b) Dashboard.tsx
    