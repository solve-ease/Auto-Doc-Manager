import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import DocVerifyImg from '../assets/img/doc-verify.png'
import analysisImg from '../assets/img/analysis.png'
import moneyImg from '../assets/img/money.png'
import voteImg from '../assets/img/vote.png'
import eduCap from '../assets/img/education-cap.png'
import healthHeart from '../assets/img/health.png'
import mapPointer from '../assets/img/location.png'
import manRunning from '../assets/img/running.png'
import tank from '../assets/img/tank.png'
import idCard from '../assets/img/id-card.png'
import moneyBag from '../assets/img/finance.png'
import stepsImg from '../assets/img/steps.png'
import compassImg from '../assets/img/compass.png'
import aboutImg from '../assets/img/about.png'

const Hero = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #232323;
  color: white;
  height: 70vh;
  gap: 10px;
  margin-bottom: 10vh;
`
const HeroH1 = styled.h1`
  text-align: center;
`
const ScannerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  bottom: 40px;
  right: 40px;
  padding: 1rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`
const QuickLinksSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20vh 10vw;
  gap: 20px;
`
const QuickLinksCards = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`
const QuickLinkCard = styled.section.withConfig({
  shouldForwardProp: (prop) => !['color'].includes(prop)
})`
  display: flex;
  background-color: ${({ color }) => color || 'white'};
  padding: 10px;
  border-radius: 5px;
  gap: 5px;
  align-items: center;
  transition: transform 0.3s ease;
  box-shadow: 1px 4px 8px 1px #8c8c8c;
  &:hover {
    transform: scale(1.1);
  }
`
const QuickLinkCardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`
const QuickLinkCardImg = styled.img`
  height: 50px;
`
const ButtonLinks = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
`
const DocVerifySection = styled.section`
  display: flex;
  align-items: center;
  padding: 10vh 10vw;
`
const DocVerifyText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`
const DocVerifyImage = styled.img`
  height: 400px;
`

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10vh 10vw;
  align-items: center;
  gap: 30px;
`
const CategoryHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const CategoryCards = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  justify-content: space-evenly;
`
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* gap: 10px; */
`
const CategoryCardImg = styled.img`
  height: 75px;
`
// Search bar container
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-primary);
`

// Search input field
const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 1rem;
`

// Search button
const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: var(--color-primary);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`

//Steps Section
const StepsSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20vh 10vw;
  gap: 100px;
`
const StepsText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`
const StepsImg = styled.img`
  height: 500px;
`
const CompassImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`

//About section
const AboutSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30vh 10vw;
  gap: 100px;
`
const AboutText = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const AboutImg = styled.img`
  height: 300px;
`
const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Hero>
        <HeroH1 className='font-ex-large font-bold'>
          Experience the Future of Secure Document Storage with{' '}
          <span className='color-primary '>DockChecker</span>
        </HeroH1>
        <h3 className='font-mid-medium'>
          Issue Verify and Store with Confidence
        </h3>
        <ScannerDiv>
          <span
            className='material-symbols-outlined'
            style={{ color: 'black' }}
            onClick={() => {
              navigate('/upload')
            }}
          >
            document_scanner
          </span>
        </ScannerDiv>
      </Hero>

      <QuickLinksSection>
        <QuickLinksCards>
          <h1 className='font-ex-large font-bold'>
            Quick <span className='color-primary'> Links</span>{' '}
          </h1>
          <QuickLinkCard color='#A7C1F2'>
            <QuickLinkCardText>
              <h3 className='font-bold'>X and XII Documents </h3>
              <p className='font-ex-small'>
                Now download your marksheets with other essential documents
              </p>
              <button className='btn-secondary font-ex-small'>View</button>
            </QuickLinkCardText>
            <QuickLinkCardImg src={analysisImg} alt='Analysis' />
          </QuickLinkCard>
          <QuickLinkCard color='#FE8B8B'>
            <QuickLinkCardText>
              <h3 className='font-bold'>Banking Documents </h3>
              <p className='font-ex-small'>
                Enjoy your savings and earning with best way to utilizing
              </p>
              <button className='btn-secondary font-ex-small'>View</button>
            </QuickLinkCardText>
            <QuickLinkCardImg src={moneyImg} alt='Analysis' />
          </QuickLinkCard>
          <QuickLinkCard color='#B1B9FD'>
            <QuickLinkCardText>
              <h3 className='font-bold'>Voting Documents </h3>
              <p className='font-ex-small'>
                You are the one who rule yourself by voting to the rulers
              </p>
              <button className='btn-secondary font-ex-small'>View</button>
            </QuickLinkCardText>
            <QuickLinkCardImg src={voteImg} alt='Analysis' />
          </QuickLinkCard>
        </QuickLinksCards>
        <ButtonLinks>
          <button className='btn-secondary font-small'>Aadhar Card</button>
          <button className='btn-secondary font-small'>Voter Id</button>
          <button className='btn-secondary font-small'>
            X & XII Marksheets
          </button>
          <button className='btn-secondary font-small'>
            Property Documents
          </button>
          <button className='btn-secondary font-small'>
            Educational Certificates
          </button>
          <button className='btn-secondary font-small'>
            Banking Documents
          </button>
        </ButtonLinks>
      </QuickLinksSection>

      <DocVerifySection>
        <DocVerifyText>
          <h1 className='font-ex-large font-bold'>Verify Documents</h1>
          <p>
            Our application accelerates the traditionally slow document
            verification process by leveraging advanced AI technology, ensuring
            rapid, accurate, and secure verification of your documents, saving
            you valuable time and effort
          </p>
          <button className='btn'>Scan Document</button>
        </DocVerifyText>
        <DocVerifyImage src={DocVerifyImg} alt='DocVerify' />
      </DocVerifySection>

      <CategorySection>
        <CategoryHeading>
          <h1 className='font-ex-large font-bold'>
            Find Your Document Based on{' '}
            <span className='color-primary'>Category</span>
          </h1>
          <SearchBarContainer>
            <SearchInput type='text' placeholder='Search...' />
            <SearchButton>Search</SearchButton>
          </SearchBarContainer>
        </CategoryHeading>
        <CategoryCards>
          <CategoryCard>
            <CategoryCardImg src={eduCap} alt='graduation cap' />
            <span className='font-mid-bold'>Learning and Education </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={mapPointer} alt='map pointer' />
            <span className='font-mid-bold'>Property </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={idCard} alt='id card' />
            <span className='font-mid-bold'>Identity & Docs </span>
          </CategoryCard>
        </CategoryCards>
        <CategoryCards>
          <CategoryCard>
            <CategoryCardImg src={moneyBag} alt='Money bad' />
            <span className='font-mid-bold'>Bank </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={tank} alt='tank' />
            <span className='font-mid-bold'>Ministry of Defence </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={manRunning} alt='man running' />
            <span className='font-mid-bold'>Sports and Activities </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={healthHeart} alt='health' />
            <span className='font-mid-bold'>Health and wellness </span>
          </CategoryCard>
        </CategoryCards>
      </CategorySection>

      <StepsSection>
        <StepsText>
          <h1 className='font-bold font-ex-large'>
            Let’s start verification with few and simple steps!
          </h1>
          <h3 className=''>
            Upload, verify, and securely store your documents with our
            application. Experience seamless document management with advanced
            security features, ensuring your data remains safe and easily
            accessible whenever you need it
          </h3>
          <button className='btn'>Get Started</button>
        </StepsText>
        <StepsImg src={stepsImg} />
        <CompassImg src={compassImg} />
      </StepsSection>
      <AboutSection>
        <AboutText>
          <h1 className='font-ex-large font-bold'>About us</h1>
          <p>
            Our platform is a groundbreaking initiative that enhances digital
            empowerment by providing secure access to authentic documents
            through a state-of-the-art digital interface. Leveraging AI and
            blockchain technology, it offers a reliable cloud-based solution for
            the generation, storage, verification, and retrieval of essential
            documents. Designed for both individuals and organizations, our
            platform ensures security, transparency, and efficiency, empowering
            users to manage their vital documents with confidence and ease.
          </p>
        </AboutText>
        <AboutImg src={aboutImg} />
      </AboutSection>
    </>
  )
}

export default Home
