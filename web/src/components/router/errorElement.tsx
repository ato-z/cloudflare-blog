import { Link, useRouteError } from 'react-router-dom';
import './errorElement.scss';
import { useEffect, useState } from 'react';
import { isResponseError } from '@web/helper/assert';
export const ErrorElement = () => {
  const error = useRouteError();
  const [detail, setDateil] = useState<{
    description?: string;
    stack?: string;
    errorCode?: string;
  }>({});

  useEffect(() => {
    if (error instanceof Error) {
      const errorCode = Reflect.get(error, 'code') ?? 'Unknown';
      setDateil({
        description: error.message,
        errorCode,
        stack: error.stack,
      });
    }

    if (isResponseError(error)) {
      setDateil({
        description: `${error.errorCode} ${error.message}`,
        errorCode: `HTTP ${error.status} ${error.code}`,
        stack: `${error.method} ${error.url}`,
      });
    }
  }, [error]);

  return (
    <aside className="error-view">
      <div>
        <p>
          {'>'} <span>ERROR CODE</span>: "<i>{detail.errorCode}</i>"
        </p>
        <p>
          {'>'} <span>ERROR DESCRIPTION</span>: "<i>{detail.description}</i>"
        </p>
        <p>
          {'>'} <span>ERROR POSSIBLY CAUSED BY</span>: [<b>{detail.stack}</b>]
        </p>
        <p>
          {'> '}
          <span>
            SOME PAGES ON THIS SERVER THAT YOU DO HAVE PERMISSION TO ACCESS
          </span>
          : [<Link to="/">Home Page</Link>]
        </p>
        <p>
          {'>'} <span>HAVE A NICE DAY :-)</span>
        </p>
      </div>
    </aside>
  );
};
