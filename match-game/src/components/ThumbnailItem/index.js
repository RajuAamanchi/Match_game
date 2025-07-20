import './index.css'

const ThumbnailItem = props => {
  const {thumbnailItem, onClickThumbnail} = props
  const {thumbnailUrl, id} = thumbnailItem

  const handleClick = () => {
    onClickThumbnail(id)
  }

  return (
    <li className="thumbnail-item">
      <button className="thumbnail-button" type="button" onClick={handleClick}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default ThumbnailItem
