import { BsGithub } from 'react-icons/bs';
import '../styles/SocialMedia.scss';

const SocialMedia = () => {
  return (
    <>
      <div className="text-indicator">See the developers</div>
      <div className="app__social">
        <a href="https://github.com/tobiashungwe/monet-generator" target="_blank" rel="noopener noreferrer" className="repo-link left">
          <BsGithub />
        </a>
        <div className="content">
          <span className="made-by">Made by:</span>
          <div className="creator">
            <BsGithub />
            <a href="https://github.com/tobiashungwe" className="creator__name">Tobias Hungwe</a>
          </div>
          <div className="creator">
            <BsGithub />
            <a href="https://github.com/jensen-caestecker-howest-be" className="creator__name">Jensen Caestecker</a>
          </div>
          <div className="creator">
            <BsGithub />
            <a href="https://github.com/WardGovaert" className="creator__name">Ward Govaert</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialMedia;
