import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

const PlaylistWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const PlaylistItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const PlaylistText = styled(ListItemText)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const Playlist = ({ tracks }) => {
    tracks=[{title:"11.nac",artist:"achyut"},{title:"11.nac",artist:"achyut"},{title:"11.nac",artist:"achyut"}]
  return (
    <PlaylistWrapper sx={{mx:60}}>
      <List>
        {tracks.map((track, index) => (
          <PlaylistItem key={index}>
            <ListItemAvatar>
              <Avatar alt={track.title} src={track.cover} />
            </ListItemAvatar>
            <PlaylistText
              primary={track.title}
              secondary={track.artist}
            />
          </PlaylistItem>
        ))}
      </List>
    </PlaylistWrapper>
  );
};

export default Playlist;
