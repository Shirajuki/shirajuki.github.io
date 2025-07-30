import { motion } from "framer-motion";
import PostCard from "./PostCard";
import type { Post } from "@/lib/utils";

const postAnimate = {
  exit: { y: -10, opacity: 0 },
  initial: { y: -10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

type Props = {
  posts: Post[];
};
const PostWrapper = ({ posts }: Props) => {
  return (
    <motion.ul
      class="flex flex-col gap-y-4 pb-4"
      transition={{ staggerChildren: 2.5, delayChildren: 2.8 }}
    >
      {posts.map((post) => (
        <motion.li class="relative block" key={post.id} {...postAnimate}>
          <PostCard post={post} />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default PostWrapper;
