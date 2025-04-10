import { LABEL_VALUES } from '../constants'
const ImageLogo = () => {
    return (
        <div className="flex items-center justify-center mt-10">
            <img src={LABEL_VALUES.LOGO_IMG} alt="logo" className="min-w-[100px]" />
        </div>
    )
}

export default ImageLogo