import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  isAbsolute?: boolean;
}

export function Loader({ isAbsolute = false }: Props) {
  return (
    <Backdrop
      open={true}
      sx={(theme) => ({
        position: isAbsolute ? 'absolute' : '',
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}
