import { Navigate, Routes, Route } from "react-router";
import { Assets } from "./Assets";
import { DataContextProvider } from "./DataContext";
import { Markets } from "./Markets";

export function App() {

    return (
        <div>
            <Routes >
                    <Route path='/markets' element={<DataContextProvider><Markets /></DataContextProvider>} />
                    <Route path='/assets' element={<DataContextProvider><Assets /></DataContextProvider>} />
                    <Route
                        path="*"
                        element={<Navigate to="/assets" replace />}
                    />
            </Routes>
        </div>
    )
}