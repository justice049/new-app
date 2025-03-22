
import style from './Child.module.scss'
function Child() {
    return (
        <div>
            <ul>
                <li className={style.item}>Child-1111</li>
                <li className={style.item}>Child-2222</li>
                <li className={style.item}>Child-3333</li>
               
            </ul>
        </div>
    )
}

export default Child;