import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface User {
  id: string;
  name: string;
  image: string;
}

interface Review {
  id: string;
  user: User;
  rating: number;
  comment: string;
  createdDate: string;
}

interface ListType {
  id: string;
  title: string;
  album: string;
  genre: string;
  artist: string;
  releasedYear: string;
  selectedImage: string;
  description: string;
  images: string[];
  reviews: Review[];
}

interface ListRatingProps {
  list: ListType;
}

const ListRating: React.FC<ListRatingProps> = ({ list }) => {
  if (list.reviews.length === 0) return null;

  return (
    <div>
      <Heading title="Music Reviews" />
      <div className="text-sm mt-2">
        {list.reviews.map((review) => {
          return (
            <div key={review.id} className="max-w-[300px]">
              <div className="flex gap-2 items-center">
                <div>
                  <Avatar src={review.user.image} />
                </div>
                <div className="font-semibold">{review.user.name}</div>
                <div className="font-light">
                  {moment(review.createdDate).fromNow()}
                </div>
              </div>
              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <div className="ml-4">{review.comment}</div>
                <hr className="my-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListRating;
