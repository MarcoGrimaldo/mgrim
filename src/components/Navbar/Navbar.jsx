import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CodeIcon from '@mui/icons-material/Code';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useThemeContext } from '../../modules/theme/theme';
import { useTranslation } from 'react-i18next';

export default function ButtonAppBar() {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState(false);
  const { toggleTheme } = useThemeContext();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleChangeSelect = (event) => {
    changeLanguage(event.target.value);
  };
  const handleChangeTheme = () => {
    setTheme(!theme);
    toggleTheme();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: 'text.primaryLight2' }}>
            <CodeIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: '1', color: 'text.primaryLight2' }}>
            MGrim Dev
          </Typography>
          <IconButton sx={{ mr: 2 }} onClick={handleChangeTheme}>
            {theme ? <WbSunnyIcon /> : <DarkModeIcon />}
          </IconButton>
          <Select label="Age" onChange={handleChangeSelect} defaultValue={'en'}>
            <MenuItem value={'en'}>English 🇺🇸🇬🇧</MenuItem>
            <MenuItem value={'es'}>Español 🇲🇽</MenuItem>
            <MenuItem value={'it'}>Italiano 🇮🇹</MenuItem>
            <MenuItem value={'jp'}>日本語 🇯🇵</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
