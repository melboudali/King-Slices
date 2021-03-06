import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../components/common/SEO";
import Pagination from "../components/Pagination";
import styled from "styled-components";
import PropTypes from "prop-types";

const SliceKingsWrapper = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  .gatsby-image-wrapper {
    height: 400px;
    object-fit: fill;
    transform: rotate(1deg);
  }
`;

const SliceKingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    border-bottom-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  h2 {
    transform: rotate(-3deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -3rem;
    position: relative;
    z-index: 2;
  }
  p {
    font-size: 1.5rem;
    background: var(--yellow);
    margin: -3rem 2rem 0 2rem;
    z-index: 2;
    transform: rotate(3deg);
    padding: 1rem;
    border-top-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    box-shadow: 0px 13px 13px -16px rgba(0, 0, 0, 0.75);
  }
  &:hover {
    h2 {
      transform: rotate(3deg);
    }
    p {
      transform: rotate(-3deg);
    }
  }
`;

const Slicekings = ({
  data: {
    sliceKings: { nodes, totalCount },
  },
  pageContext,
}) => {
  return (
    <>
      <Seo
        title={`Slice Kings · Page ${pageContext.currentPage ?? 1}`}
        description="All Slice Kings."
        location={`${process.env.GATSBY_GRAPHQL_BASE}/slicekings/${
          pageContext.currentPage ?? 1
        }/`}
      />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicekings"
      />
      <SliceKingsWrapper>
        {nodes.map(({ id, name, description, slug, image }) => (
          <SliceKingWrapper key={id}>
            <Link to={`/sliceking/${slug.current}/`}>
              <h2>
                <span className="mark">{name}</span>
              </h2>
            </Link>
            <GatsbyImage image={getImage(image.asset)} alt={name} />
            <p className="description">{description}</p>
          </SliceKingWrapper>
        ))}
      </SliceKingsWrapper>
    </>
  );
};

Slicekings.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Slicekings;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    sliceKings: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            gatsbyImageData(width: 410, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
