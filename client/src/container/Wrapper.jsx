/* eslint-disable react/prop-types */
const Wrapper = ({ children }) => {
    return (
        <>
            <div className="min-h-full flex items-center justify-center bg-black mb-20">
                <div className="max-w-xl mx-auto max-h-screen">
                    {children}
                </div>
            </div>
        </>

    )
}

export default Wrapper