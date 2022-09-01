
export const Story = ({id, cssClass, historia}) => {
    return <p key = {id} className={'story ' + cssClass}>{historia}</p>;
}