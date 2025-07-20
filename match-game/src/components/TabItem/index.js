import './index.css'

const TabItem = props => {
  const {tabItem, onClickTabItem, isActive} = props
  const {tabId, displayText} = tabItem

  const onClickTab = () => {
    onClickTabItem(tabId)
  }

  const tabClassName = isActive ? 'tab-button active' : 'tab-button'

  return (
    <li>
      <button className={tabClassName} onClick={onClickTab} type="button">
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
