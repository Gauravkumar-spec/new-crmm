import DOMPurify from "dompurify"; // run `npm install dompurify`
import parse from "html-react-parser";

const MessageRender = ({ html }) => {
    const cleanHTML = DOMPurify.sanitize(html); // prevent XSS attacks

    return (
        <div className="prose max-w-none bg-white p-4 rounded-xl shadow">{parse(cleanHTML)}</div>
    );
};

export default MessageRender;
