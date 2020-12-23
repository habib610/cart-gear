import Loader from 'react-loader-spinner'
const Loading = () => {
    return (
        <div className="middle">
            <Loader
                type="Oval"
                color=" var(--mainBg) "
                height={100}
                width={100}
            />
        </div>


    );
}

export default Loading;