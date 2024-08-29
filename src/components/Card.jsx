import { FaFileAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";

function Card({ data, reference, onClose, onDownload }) {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      className="relative flex-shrink-0 w-60 h-72 rounded-[40px] bg-zinc-900/90 text-white py-10 px-8 overflow-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-red-600 p-1.5 rounded-full focus:outline-none hover:bg-red-700"
      >
        <IoCloseSharp size="1.5em" />
      </button>

      <FaFileAlt className="text-4xl mb-4 mx-auto" />
      <p className="text-center text-sm font-bold truncate">{data.filename}</p>
      <p className="text-center text-sm leading-tight mt-2 font-semibold">
        {data.desc}
      </p>

      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between mb-3 py-3 px-8">
          <h5 className="text-sm">{data.filesize}</h5>
          <button
            onClick={onDownload}
            className="w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500"
          >
            <MdFileDownload size="1.2em" color="#000" />
          </button>
        </div>

        {data.tag.isOpen && (
          <div
            className={`tag w-full py-4 flex items-center justify-center ${
              data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-500"
            }`}
          >
            <h3 className="text-base font-semibold">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    filesize: PropTypes.string.isRequired,
    close: PropTypes.bool.isRequired,
    tag: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      tagTitle: PropTypes.string.isRequired,
      tagColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  reference: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }), // or use PropTypes.object for a more general ref
  onClose: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default Card;
