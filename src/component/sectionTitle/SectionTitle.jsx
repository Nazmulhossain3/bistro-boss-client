
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="w-4/12 mx-auto my-8 font-serif">
            <p className="text-yellow-500 text-center mb-2">---{subHeading}---</p>
            <h2 className="text-3xl border-y-4 py-4 text-center">{heading}</h2>
        </div>
    );
};

export default SectionTitle;