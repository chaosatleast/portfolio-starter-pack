import { client } from "./client";
import { groq } from "next-sanity";

export async function getSkills() {
    return client.fetch(groq`*[_type == "skill"]{
    _id,
    _createdAt,
    name,
    category,
    image{
    alt,
    asset->{
      _id,
      url,
    }
  },
    familiarity,
    isDisplay,
  }`);
}

export async function getExperiences() {
    return client.fetch(groq`*[_type == "experience"]{
    _id,
    _createdAt,
    name,
    company,
    description,
    startingPeriod,
    endingPeriod,
    position,
    order
  }`);
}

export async function getContact() {
    return client.fetch(groq`*[_type == "contact"]{
    _id,
    _createdAt,
    platform,
    url,
  }`);
}

export async function getProject() {
    return client.fetch(groq`*[_type == "project"]{
    _id,
    _createdAt,
    title,
    description,
    devType,
    techUsed,
    coverImage{
    alt,
    asset->{
      _id,
      url,
    }
  },
     screenshots[]{
    alt,
    asset->{
      _id,
      url,
    }
  },
    demoUrl,
    sourceCodeUrl,
    isDisplay,
    slug,
  }`);
}

export async function getAboutMePageSettings() {
    return client.fetch(groq`*[_type == "aboutMe"]{
    _id,
    name,
    positionSeekingFor,
    image{
      alt,
      asset->{
        _id,
        url,
      },
    },
    headerContent,
    bodyContent,
  }`);
}

export async function getPagesHeader() {
    return client.fetch(groq`*[_type == "settings"]{
    _id,
    projectsHeaderContent,
    skillsHeaderContent,
    contactEmail,
    emailText 
  }`);
}

export async function getBlogUrl() {
    return client.fetch(groq`*[_type == "settings"]{
      blogUrl
  }`);
}

export async function getProjectBySlug(slugStr: string) {
    return client.fetch(
        groq`*[_type == "project" && slug.current == $slugStr]{
      _id,
      _createdAt,
      title,
      description,
      devType,
      techUsed,
      coverImage{
        alt,
        asset->{
          _id,
          url,
        }
      },
      screenshots[]{
        alt,
        asset->{
          _id,
          url,
        }
      },
      demoUrl,
      sourceCodeUrl,
      isDisplay,
      slug,
    }`,
        { slugStr }, // Pass the variable as a parameter here
    );
}
