/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  skipToken,
  type ApiEndpointQuery,
  type QueryActionCreatorResult,
  type QueryDefinition,
  type RootState,
  type SkipToken,
} from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Source: https://github.com/reduxjs/redux-toolkit/issues/1353#issuecomment-1160398289
export function useQueries<QueryArgs, ReturnValue>(
  endpointQuery: ApiEndpointQuery<
    QueryDefinition<QueryArgs, any, any, ReturnValue, string>,
    any
  >,
  queriesOptions: {
    serializeArgs: (args: (QueryArgs | SkipToken)[]) => string | number;
  },
) {
  return function (options: (QueryArgs | SkipToken)[]) {
    const dispatch = useDispatch<ThunkDispatch<any, any, UnknownAction>>();

    useEffect(() => {
      const subscriptions: QueryActionCreatorResult<any>[] = options
        .filter((options): options is QueryArgs => options !== skipToken)
        .map((options) => dispatch(endpointQuery.initiate(options)));

      return () => {
        subscriptions.forEach((s) => s.unsubscribe());
      };
    }, [dispatch, queriesOptions.serializeArgs(options)]);

    return useSelector((state) =>
      options.map((options) =>
        endpointQuery.select(options)(state as RootState<any, any, string>),
      ),
    );
  };
}
