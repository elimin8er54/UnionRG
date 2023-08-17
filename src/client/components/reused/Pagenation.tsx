import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

type Props = {
    changePage(event: React.ChangeEvent<unknown>, page: number): void,
    totalPages: number,
    currentPage: number
}

const Pagenation = (props: Props) => {
    return (
        <Pagination
            count={props.totalPages}
            onChange={props.changePage}
            page={props.currentPage}
            variant="outlined"
            color="primary" />
    );
}

export default Pagenation;