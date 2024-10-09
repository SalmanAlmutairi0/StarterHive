import { useEffect, useState } from 'react';
import IssueItem from './IssueItem';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
export const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const [organization, projectName] = location.pathname.split('/').slice(-2);

  useEffect(() => {
    const getIssues = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://issue-finder-api.vercel.app/api/goodfirstissues/${organization}/${projectName}`
        );

        setIssues(response.data.issues);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getIssues();
  }, [organization, projectName]);
  return (
    <>
      <section className="text-gray-400 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto w-full">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-white">
              <span className="text-4xl text-yellow-400 font-extrabold animate-pulse">
                Good First Issues
              </span>{' '}
            </h1>
          </div>

          {isLoading && <p className="text-center">Loading...</p>}

          {!isLoading && issues.length === 0 && (
            <p className="text-center text-3xl">No issues found.</p>
          )}

          <div className="grid grid-cols-4 gap-5">
            {issues.map((issue, index) => {
              return (
                <IssueItem
                  key={index}
                  title={issue.title}
                  description={issue.description}
                  url={issue.url}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
