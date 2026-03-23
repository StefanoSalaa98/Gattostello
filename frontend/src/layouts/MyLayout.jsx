import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import TextCursor from "../components/TextCursor"
import { IoMdPaw } from "react-icons/io";

export default function MyLayout() {
    return (
        <>
            <TextCursor
                text={<IoMdPaw />}
                spacing={80}
                followMouseDirection
                randomFloat
                exitDuration={0.7}  /* quanto dura la dissolvenza */
                removalInterval={135}  /* ogni quanto viene rimossa una icona */
                maxPoints={10}
            />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}