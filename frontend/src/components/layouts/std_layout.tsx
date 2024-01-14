import { type ReactElement } from 'react'
import style from './std_layout.module.css'

export function StdLayout ({ title, children, bottom }: { title: string, children: ReactElement, bottom?: ReactElement }): ReactElement {
  return <main>
    <div className='heading_secton'>
        <div>&nbsp;</div>
        <h1>{title}</h1>
    </div>
    <div className={style.content}>
        {children}
    </div>
    {bottom != null && <div className={style.bottom}>
        {bottom}
    </div>
    }
  </main>
}
