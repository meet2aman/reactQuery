import * as React from "react";
import Button from "@mui/joy/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";
import Chip from "@mui/joy/Chip";
import CircularProgress from "@mui/joy/CircularProgress";
import { Checkbox, List, ListItem } from "@mui/joy";
import Done from "@mui/icons-material/Done";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";

const PostList = () => {
  const [value, setValue] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const {
    data: postData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    onError: () => {
      setOpen(true);
    },
  });

  React.useEffect(() => {
    if (isError) setOpen(true);
  }, [isError]);

  const refetch = () => {
    window.location.reload();
  };

  const {
    mutate,
    error: postError,
    isError: isPostError,
    reset,
  } = useMutation({
    mutationKey: ["add-Post"],
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
    onError: () => {
      setOpen(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    console.log(title, value);
    if (!title || value.length < 0) return;
    mutate({ id: postData?.data?.length + 1, title, tags: value });
    e.target.reset();
    setValue("");
  };

  return (
    <div className="mt-10">
      <Snackbar
        variant="soft"
        color="outlined"
        size="md"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => {
              {
                isError ? refetch() : reset();
              }
              setOpen(false);
            }}
            size="sm"
            variant="soft"
            color="success"
          >
            {isError ? "Refetch" : "Reset"}
          </Button>
        }
      >
        {isError ? "Unable to Fetch" : "Unable to Post"}
      </Snackbar>
      {postData?.config?.url ? (
        <a target="_blank" href={postData?.config?.url}>
          <span className="text-white mr-3">The Api is hitting on</span>
          <Chip variant="soft" color="neutral">
            {postData?.config?.url}
          </Chip>
        </a>
      ) : (
        ""
      )}

      {isLoading ? (
        <>
          <div className="flex justify-center items-center gap-5">
            <CircularProgress variant="outlined" />
            <p className="text-3xl text-white">please Wait Loading....</p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white text-3xl text-center w-full font-black my-5">
            ALL POSTS
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              className="py-2 px-4 w-full rounded-md bg-gray-700/60 text-gray-100 tracking-wide no-focus"
              type="text"
              placeholder="Please enter your post..."
              name="title"
            />
            <div className="mt-5 flex justify-between w-full gap-10">
              <Chip>Tags</Chip>
              <List
                orientation="horizontal"
                wrap
                sx={{
                  "--List-gap": "8px",
                  "--ListItem-radius": "20px",
                  "--ListItem-minHeight": "32px",
                  "--ListItem-gap": "4px",
                }}
              >
                {tagsData?.data.map((tag, index) => (
                  <ListItem key={tag}>
                    {value.includes(tag) && (
                      <Done
                        fontSize="md"
                        color="primary"
                        sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
                      />
                    )}

                    <Checkbox
                      size="sm"
                      disableIcon
                      overlay
                      label={tag}
                      checked={value.includes(tag)}
                      variant={value.includes(tag) ? "soft" : "outlined"}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setValue((val) => [...val, tag]);
                        } else {
                          setValue((val) => val.filter((text) => text !== tag));
                        }
                      }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: checked
                            ? {
                                border: "1px solid",
                                borderColor: "primary.500",
                              }
                            : {
                                backgroundColor: "white",
                              },
                        }),
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </div>

            <button className="bg-gray-200 w-full mt-4 py-2 rounded-md hover:bg-white transition-all">
              POST
            </button>
          </form>
          {postData?.data?.map((post) => (
            <div
              className="text-white flex items-center justify-start bg-neutral-700/40 gap-3 my-4 px-4 py-2 rounded-md"
              key={post.id}
            >
              {post?.title}
              {post?.tags.map((tag) => (
                <span
                  className="text-white text-sm bg-slate-700  px-3 py-1 rounded-md"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </>
      )}
      {isError && (
        <div className="flex justify-center items-center gap-5">
          <p className="text-red-500 text-semibold tracking-wide text-lg">
            {error?.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default PostList;
